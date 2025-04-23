import { DateTime } from 'luxon'

/*

Contact Status -> status -> incidentstatus
Date Range -> date -> fldcreateddt
WINS -> text open -> fldwinsid
Reference ID -> text open -> cifreferenceid
TRA -> text open -> tra

 */

/*
Either null, {from: '', to: ''}, 'yyyy-mm-dd'
*/

function reducer(fieldNames, data) {
  function extractFromArray(data, key) {
    return data.flatMap((x) => extractFromObject(x, key))
  }

  function extractFromObject(data, key) {
    if (data === null) {
      return []
    }
    const result = data[key]
    return Array.isArray(result) ? result : [result]
  }

  function dispatchBasedOnType(data, key) {
    if (Array.isArray(data)) {
      return extractFromArray(data, key)
    } else if (typeof data === 'object') {
      return extractFromObject(data, key)
    } else {
      return data
    }
  }
  return fieldNames.reduce((pv, key) => dispatchBasedOnType(pv, key), data)
}

function comparisonFactory(fieldName, callback) {
  const fieldNames = fieldName.split('.')
  return (v) => {
    const checks = reducer(fieldNames, v)
    return checks.findIndex(callback) > -1
  }
}

export function dateCompareFactory(dateFilter, fieldName) {
  let testFn = null
  if (dateFilter === null) {
    return (v) => true
  } else if (typeof dateFilter === 'object') {
    const start = DateTime.fromFormat(dateFilter.from, 'yyyy-MM-dd').startOf(
      'day'
    )
    const finish = DateTime.fromFormat(dateFilter.to, 'yyyy-MM-dd').endOf('day')
    testFn = (check) => start <= check && check <= finish
  } else {
    const test = DateTime.fromFormat(dateFilter, 'yyyy-MM-dd').startOf('day')
    testFn = (check) => test.equals(check)
  }

  return comparisonFactory(fieldName, (x) =>
    testFn(DateTime.fromISO(x).startOf('day'))
  )
}

/*
Either null or one of the options
*/

export function exactMatch(optionFilter, fieldName) {
  if (optionFilter === null) {
    return (v) => true
  }

  return comparisonFactory(fieldName, (x) => x === optionFilter)
}

export function startsWithMatch(optionFilter, fieldName) {
  if (optionFilter === null) {
    return (v) => true
  }

  return comparisonFactory(fieldName, (x) =>
    (x || '').toLowerCase().startsWith(optionFilter.toLowerCase())
  )
}

export function booleanMatch(optionFilter, fieldName) {
  return exactMatch(optionFilter, fieldName)
}

/*
 */

export function openComparison(filterValue, fieldName) {
  if (filterValue === null) {
    return (v) => true
  }
  const pattern = new RegExp(filterValue, 'i')
  return comparisonFactory(fieldName, (x) => pattern.test(x))
}

function addToFilterArray(filters, matcherFn, value, fieldName) {
  if ((value || null) !== null) {
    const values = Array.isArray(value) ? value : [value]
    const fieldNames = Array.isArray(fieldName) ? fieldName : [fieldName]
    fieldNames.forEach((f) => {
      values.forEach((v) => {
        filters.push(matcherFn(v, f))
      })
    })
  }
}

export function orComparitorFactory() {
  const filters = []
  return {
    add(matcherFn, value, fieldName) {
      addToFilterArray(filters, matcherFn, value, fieldName)
    },
    getCheckFn() {
      return (v) => {
        return filters.findIndex((f) => f(v)) > -1
      }
    },
    empty() {
      return filters.length === 0
    },
  }
}

function logAndPass(v) {
  console.log(v)
  return v
}

export function matcherFactory() {
  const filters = []
  const manager = {
    add(matcherFn, value, fieldName) {
      addToFilterArray(filters, matcherFn, value, fieldName)
    },
    addOrs(matcherFn, value, fieldName) {
      if ((value || null) !== null) {
        const values = Array.isArray(value) ? value : [value]
        let orComparitor
        values.forEach((v) => {
          orComparitor = orComparitorFactory()
          orComparitor.add(matcherFn, v, fieldName)
          if (!orComparitor.empty()) {
            filters.push(orComparitor.getCheckFn())
          }
        })
      }
    },
    test(v) {
      return filters.every((f) => f(v))
    },
    empty() {
      return filters.length === 0
    },
  }

  return manager
}

export function maybeTextToArray(text) {
  return (text || null) === null ? [] : text.split(' ')
}

export function incidentFilter(filter, data) {
  return filterFactory(data, (filters) => {
    filters.add(dateCompareFactory, filter.date, 'fldcreateddt')
    filters.add(exactMatch, filter.status, 'incidentstatus')
    filters.addOrs(openComparison, maybeTextToArray(filter.text), [
      'fldwinsid',
      'cifreferenceid',
      'tra',
      'incidentSchools.naepid',
      'incidentSchools.schoolName',
      'incidentSchools.districtName',
      'incidentSchools.jurisdiction',
    ])
  })
}

export default function filterFactory(data, setup) {
  if (!Array.isArray(data)) {
    throw new Error('data argument must be of type Array')
  }
  const filters = matcherFactory()
  setup(filters)

  if (filters.empty()) {
    return data
  } else {
    return data.filter((x) => filters.test(x))
  }
}
