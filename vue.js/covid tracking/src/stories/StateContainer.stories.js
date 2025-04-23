import StateContainer from '../components/incident-detail/StateContainer.vue'
import { transformIncidentState } from '../lib/data-transformers'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/StateContainer',
  component: StateContainer,
  argTypes: {
    onCallHandled: {},
    onContactSelected: {},
    onItemSelected: {},
    onSendEmail: {},
    onCloseIncident: {},
    onCloseContact: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { StateContainer },
    setup() {
      return { args }
    },
    template: `<state-container v-bind="args"></state-container>`,
  }
})

function sampleScriptGenerator(name) {
  return {
    emailScript: `<div>Hello ${name}, email</div>`,
  }
}
const contactHistory = [
  {
    fldcontactlogid: 41,
    fldcontactid: 11,
    fldincidentid: 14,
    cifreferenceid: '0162937',
    contactlogtypedesc: 'Call started',
    fldcontactcodedesc: 'School Coordinator',
    updateduesrname: 'Sandy Huang',
    createddt: '2022-01-10T18:46:33.289922',
    createdDate: '2022-01-10',
    createdTime: '06:46 PM',
  },
  {
    fldcontactlogid: 40,
    fldcontactid: 11,
    fldincidentid: 14,
    cifreferenceid: '0162937',
    contactlogtypedesc: 'Call started',
    fldcontactcodedesc: 'School Coordinator',
    updateduesrname: 'Sandy Huang',
    createddt: '2022-01-10T18:11:19.979456',
    createdDate: '2022-01-10',
    createdTime: '06:11 PM',
  },
]
const sampleRows = [
  {
    __typename: 'IncidentDetails',
    fldincidentid: 1,
    states: [
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '1',
        fips: 'FIPS-11',
        name: 'District of Columbia',
        isContactRequired: 'No',
        schoolcount: '2',
        incidentcount: '2',
        hasBeenNotified: 'CONTACTED',
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 1,
            contactType: 'STATE_NSC',
            fldcontactdesc: 'State Coordinator',
            fldname: 'Dr. Gwen Stevens',
            fldphone: '111-111-1111',
            fldemail: 'Prin000029@test.test',
            ...sampleScriptGenerator('Gwen'),
          },
        ],
      },
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '2',
        fips: 'FIPS-51',
        name: 'Virginia',
        isContactRequired: 'No',
        schoolcount: '2',
        incidentcount: '3',
        hasBeenNotified: 'CONTACT_NEEDED',
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 2,
            contactType: 'STATE_NSC',
            fldcontactdesc: 'State Coordinator',
            fldname: 'SC000040',
            fldphone: '222-222-2222',
            fldemail: 'SC000040@test.test',
            ...sampleScriptGenerator('SC000040'),
          },
        ],
      },
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '3',
        fips: 'FIPS-24',
        name: 'Maryland',
        isContactRequired: 'No',
        schoolcount: '4',
        incidentcount: '5',
        hasBeenNotified: 'NOT_READY',
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 3,
            contactType: 'STATE_NSC',
            fldcontactdesc: 'State Coordinator',
            fldname: 'Prin000062',
            fldphone: '333-333-3333',
            fldemail: 'Prin000062@test.test',
            ...sampleScriptGenerator('Prin000062'),
          },
        ],
      },
    ],
  },
]

const sampleData = transformIncidentState(sampleRows[0])
console.log({ sampleData })

export const States = useTemplate({
  incidentId: '01432',
  data: sampleData,
  contactHistory,

  emailTemplates: [
    {
      id: 1,
      primaryType: 'STATE_NSC',
      tabDisplayText: 'Incident Recap',
      display: 'match',
      scriptType: 'emailScript',
    },
  ],
})
