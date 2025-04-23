import {
  ifNullish,
  phoneScriptGenerator,
  voicemailScriptGenerator,
  emailNoNotesScriptGenerator,
} from './shared.js'

export function transformIncidentDistrict(incidentDistrict) {
  const labels = {
    name: 'District Name',
    tudaDistrictFlag: 'TUDA District Flag',
    jurisdiction: 'Jurisdiction',
    schoolcount: 'Schools involved in this incident',
    incidentcount: 'Count of all incidents in this district',
  }

  const schoolCountLabel = (v) => 'Schools(' + v + ')'
  const incidentCountLabel = (v) => 'Incidents(' + v + ')'
  const fieldTransformers = {
    name: (v) => v,
    tudaDistrictFlag: (v) => v,
    jurisdiction: (v) => v,
    schoolcount: (v) => schoolCountLabel(v),
    incidentcount: (v) => incidentCountLabel(v),
  }
  const contactWeighting = {
    Superintendent: 2,
    'District Testing Coordinator': 1,
  }
  function extractDistricts(districts) {
    try {
      return districts.map((row) => {
        return {
          id: row.id,
          displayName: row.name,
          icon: row.hasBeenNotified,
          caption: row.id,
          hasBeenNotified: row.hasBeenNotified,
          displayInformation: [
            'name',
            'tudaDistrictFlag',
            'jurisdiction',
            'schoolcount',
            'incidentcount',
          ]
            .filter((key) => row[key] !== void 0)
            .map((key) => {
              return {
                caption: labels[key],
                displayName: fieldTransformers[key](row[key]),
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
      console.error({ districts })
      throw e
    }
  }
  const sampleData = {
    locationsData: {
      title: 'Districts',
      list: extractDistricts(incidentDistrict.districts),
      raw: incidentDistrict.districts,
      informationTitle: 'District Information',
    },
  }

  return sampleData
}
