import { date } from 'quasar'

import {
  ifNullish,
  phoneScriptGenerator,
  voicemailScriptGenerator,
  emailNoNotesScriptGenerator,
} from './shared.js'

export function transformIncidentDetail(incidentDetail) {
  const labels = {
    startEndTimes: 'School Day Start & End Time',
    // name: 'School Name',
    districtName: 'District Name',
    jurisdiction: 'Jurisdiction',
    assessmentDates: 'Assessment Date',
    makeupDates: 'Makeup Date',
  }
  const dateFormatter = (v) => date.formatDate(new Date(v), 'dddd MMM D, YYYY')
  const datesFormatter = (x) =>
    ifNullish(x, [])
      .map((k) => dateFormatter(k))
      .join(', ')
  const fieldTransformers = {
    name: (v) => v,
    districtName: (v) => v,
    jurisdiction: (v) => v,
    startEndTimes: (v) => v,
    assessmentDates: (v) => datesFormatter(v),
    makeupDates: (v) => datesFormatter(v),
  }
  const contactWeighting = {
    Principal: 2,
    'School Coordinator': 1,
  }
  function extractSchools(schools) {
    try {
      return schools.map((row) => {
        return {
          id: row.id,
          displayName: row.name,
          icon: row.hasBeenNotified ? 'CONTACTED' : 'CONTACT_NEEDED',
          caption: row.id,
          hasBeenNotified: row.hasBeenNotified,
          displayInformation: Object.keys(labels)
            .filter((key) => row[key] !== void 0)
            .map((key) => {
              return {
                caption: labels[key],
                displayName: ifNullish(
                  fieldTransformers[key](row[key]),
                  'Data not supplied'
                ),
              }
            }),
          contactInformation: ifNullish(row.contacts, [])
            .map((item) => {
              return {
                id: item.fldcontactid,
                type: item.contactType,
                title: item.fldcontactdesc,
                name: item.fldname,
                telephone: item.fldphone,
                extension: null,
                email: item.fldemail,
                rawScripts: {
                  emailScript: item.emailScript,
                  voicemailScript: item.voicemailScript,
                  phoneScript: item.phoneScript,
                  noCallsCompletedScript: item.noCallsCompletedScript,
                },
                emailScript: emailNoNotesScriptGenerator(item.emailScript),
                voicemailScript: voicemailScriptGenerator(item.voicemailScript),
                phoneScript: phoneScriptGenerator(item.phoneScript),
                noCallsCompletedScript: emailNoNotesScriptGenerator(
                  item.noCallsCompletedScript
                ),
              }
            })
            .sort(
              (x, y) => contactWeighting[x.type] - contactWeighting[y.type]
            ),
          raw: row,
        }
      })
    } catch (e) {
      console.error({ schools })
      throw e
    }
  }
  const sampleData = {
    locationsData: {
      title: 'Sampled Grades',
      list: extractSchools(incidentDetail.schools),
      raw: incidentDetail.schools,
      informationTitle: 'Sampled Grade Information',
    },
  }

  return sampleData
}
