import { date } from 'quasar'

export function breadcrumbManager() {
  const $crumbs = []

  function traAdapter(tra) {
    const nullIsStar = value => {
      return value === null ? '*' : value
    }
    const result = {
      display: tra
        ? `${nullIsStar(tra.territoryCode)}:${nullIsStar(
            tra.stateCode
          )}-${nullIsStar(tra.regionCode)}/${nullIsStar(tra.areaCode)}`
        : '',
      ...tra,
      map(fn) {
        return [result].map(fn)
      }
    }
    return result
  }

  /*
const sampleSchool = {
  schoolName: 'School 039428',
  assessmentVisitDate: '01/25/2021',
  gradeId: '2410371',
  assignedFieldArea: 'T21:MD-1/1',
  school: {
    schoolAddress: '231 S. Eaton Street ',
    schoolAddressCity: 'Baltimore',
    schoolAddressZip: '21224',
    schoolAddressState: 'MD'
  }
}

display: 'School 039428 (2410371) on January 25, 2021'

*/

  function schoolAdapter2(school) {
    const [mm, dd, yy] = school.assessmentVisitDate.split('/')
    const parseableDate = new Date([yy, mm, dd].join('-'))
    const formattedDate = date.formatDate(parseableDate, 'ddd, MMM D')
    const result = {
      ...school,
      display: `${school.schoolName} (${school.gradeId}) on ${formattedDate}`,
      map(fn) {
        return [result].map(fn)
      }
    }
    return result
  }
  
  
  function schoolAdapter(school) {
    const [mm, dd, yy] = school.assessmentVisitDate.split('/')
    const parseableDate = [yy, mm, dd].join('-')
    const dateToGMT = new Date( parseableDate + "T23:00:00.000Z").toUTCString()
    const formattedDate = date.formatDate(dateToGMT, 'ddd, MMM D')
    const result = {
      ...school,
      display: `${school.schoolName} (${school.gradeId}) on ${formattedDate}`,
      map(fn) {
        return [result].map(fn)
      }
    }
    return result
  }

  const result = {
    addTra(tra) {
      $crumbs.push(traAdapter(tra))
      return result
    },
    addSelectedTra(tra) {
      $crumbs.push(traAdapter(tra))
      return result
    },
    addSchool(school) {
      if (school) {
        $crumbs.push(schoolAdapter(school))
      }
      return result
    },
    map(fn) {
      return $crumbs.flatMap(x => x.map(fn))
    }
  }
  return result
}
