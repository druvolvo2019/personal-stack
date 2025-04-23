import { date } from 'quasar'

import { ifNullish, emailScriptGenerator } from './shared.js'

export function transformInitialNCES(data) {
  return transformNCES(data, true)
}

export function transformFinalNCES(data) {
  return transformNCES(data, false)
}

function transformNCES(data, isInitial) {
  const emptyLocation = {
    id: 1,
    displayName: 'No data',
    caption: '',
    displayInformation: [],
    contactInformation: [],
  }
  const emptyRow = {
    locationsData: {
      title: 'States',
      informationTitle: 'NCES Information',
      list: [emptyLocation],
    },
  }
  if (data === null) {
    return emptyRow
  }
  const dateFormatter = (v) =>
    v === null ? 'None' : date.formatDate(new Date(v), 'dddd MMM D, YYYY')
  const emails = ifNullish(data.contacts, [])
    .map((x) => x.fldemail)
    .join(';')
  const displayInformation = [
    {
      caption: dateFormatter(data.initialContact),
      displayName: 'NCES Initial Contact Date/Time',
    },
    {
      caption: dateFormatter(data.finalContact),
      displayName: 'NCES Final Contact Date/Time',
    },
  ]
  function extractStates(states) {
    try {
      return ifNullish(states, [emptyLocation]).map((row, idx) => {
        return {
          id: row.id || idx + 1,
          displayName: row.name || 'No data available',
          icon: isInitial ? undefined : row.contactStatus,
          caption: `FIPS ${row.fips}`,
          displayInformation,
          contactInformation: ifNullish(data.contacts, []).map((item) => {
            return {
              id: item.fldcontactid,
              type: item.contactType,
              title: item.fldcontactdesc,
              name: item.fldname,
              telephone: item.fldphone,
              extension: null,
              email: emails,
              toOnly: true,
              rawScripts: {
                emailScript: item.emailScript,
              },
              emailScript: emailScriptGenerator(item.emailScript),
            }
          }),
          raw: row,
        }
      })
    } catch (e) {
      console.error({ states })
      throw e
    }
  }
  const isComplete = isInitial
    ? data.initialContact !== null
    : data.initialContact !== null && data.finalContact !== null
  const sampleData = {
    locationsData: {
      title: 'States',
      list: extractStates(data.states),
      isComplete,
      raw: data.states,
      informationTitle: 'NCES Information',
    },
  }

  return sampleData
}
