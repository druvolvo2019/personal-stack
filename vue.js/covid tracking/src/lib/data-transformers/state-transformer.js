import {
  ifNullish,
  phoneScriptGenerator,
  voicemailScriptGenerator,
  emailScriptGenerator,
} from './shared.js'

export function transformIncidentState(incidentState) {
  const labels = {
    name: 'State Name',
    isContactRequired: 'Contact Required',
    schoolCount: 'Schools involved in this incident',
    incidentCount: 'Count of all incidents in this state',
  }

  const schoolCountLabel = (v) => 'Schools(' + v + ')'
  const incidentCountLabel = (v) => 'Incidents(' + v + ')'
  const fieldTransformers = {
    name: (v) => v,
    isContactRequired: (v) => v,
    schoolCount: (v) => schoolCountLabel(v),
    incidentCount: (v) => incidentCountLabel(v),
  }
  const contactWeighting = {
    'State Coordinator': 1,
    'TUDA Coordinator': 2,
  }
  function extractstates(states) {
    try {
      return states.map((row) => {
        return {
          id: row.id,
          displayName: row.name,
          icon: row.hasBeenNotified,
          caption: `FIPS ${row.fips}`,
          hasBeenNotified: row.hasBeenNotified,
          displayInformation: [
            'name',
            'isContactRequired',
            'schoolCount',
            'incidentCount',
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
                },
                emailScript: emailScriptGenerator(item.emailScript),
              }
            })
            .sort(
              (x, y) => contactWeighting[x.type] - contactWeighting[y.type]
            ),
          raw: row,
        }
      })
    } catch (e) {
      console.error({ states })
      throw e
    }
  }
  const sampleData = {
    locationsData: {
      title: 'States',
      list: extractstates(incidentState.states),
      raw: incidentState.states,
      informationTitle: 'State Information',
    },
  }

  return sampleData
}
