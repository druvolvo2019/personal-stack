import { contactHistory } from './fixtures/contact-history'
import DistrictContainer from '../components/incident-detail/DistrictContainer.vue'
import { transformIncidentDistrict } from '../lib/data-transformers'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/DistrictContainer',
  component: DistrictContainer,
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
    components: { DistrictContainer },
    setup() {
      return { args }
    },
    template: `<district-container v-bind="args"></district-container>`,
  }
})

function sampleScriptGenerator(name) {
  const phoneScript = {
    PHONE_HEADER: `Hello ${name}`,
    PHONE_BODY: `<div>Hello ${name}, phone</div>`,
    PHONE_ENDING: `Thank you and goodbye`,
  }

  return {
    emailScript: `<div>Hello ${name}, email</div>`,
    voicemailScript: `<div>Hello ${name}, voicemail</div>`,
    phoneScript: JSON.stringify(phoneScript),
    noCallsCompletedScript: `<div>Sorry we couldn't reach you ${name}. No Calls made</div>`,
  }
}

const sampleRows = [
  {
    __typename: 'IncidentDetails',
    fldincidentid: 1,
    districts: [
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '0110021',
        name: 'District of Columbia Public Districts',
        tudaDistrictFlag: 'No',
        jurisdiction: 'District of Columbia Public Districts',
        schoolcount: '2',
        incidentcount: '2',
        hasBeenNotified: 'CONTACTED',
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 1,
            contactType: 'DISTRICT_TEST_COORDINATOR',
            fldcontactdesc: 'District Testing Coordinator',
            fldname: 'Dr. Gwen Stevens',
            fldphone: '111-111-1111',
            fldemail: 'gwenstevens@test.test',
            ...sampleScriptGenerator('Gwen'),
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 5,
            contactType: 'DISTRICT_SUPERINTENDENT',
            fldcontactdesc: 'Superintendent',
            fldname: 'Susan Harrison',
            fldphone: '112-222-2222',
            fldemail: 'sharrison@example.edu',
            ...sampleScriptGenerator('Susan'),
          },
        ],
      },
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '2410021',
        name: 'Montgomery County Public Districts',
        tudaDistrictFlag: 'No',
        jurisdiction: 'Montgomery County Public Districts',
        schoolcount: '2',
        incidentcount: '3',
        hasBeenNotified: 'CONTACT_NEEDED',
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 2,
            contactType: 'DISTRICT_TEST_COORDINATOR',
            fldcontactdesc: 'District Testing Coordinator',
            fldname: 'SC000040',
            fldphone: '222-222-2222',
            fldemail: 'SC000040@test.test',
            ...sampleScriptGenerator('SC000040'),
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 6,
            contactType: 'DISTRICT_SUPERINTENDENT',
            fldcontactdesc: 'Superintendent',
            fldname: 'Prin0220022',
            fldphone: '121-111-1111',
            fldemail: null,
            ...sampleScriptGenerator('Prin0220022'),
          },
        ],
      },
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '2410023',
        name: 'Prince Georges County Public Districts',
        tudaDistrictFlag: 'No',
        jurisdiction: 'Prince Georges County Public Districts',
        schoolcount: '4',
        incidentcount: '5',
        hasBeenNotified: 'NOT_READY',
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 3,
            contactType: 'DISTRICT_TEST_COORDINATOR',
            fldcontactdesc: 'District Testing Coordinator',
            fldname: 'Prin000062',
            fldphone: '333-333-3333',
            fldemail: 'Prin000062@test.test',
            ...sampleScriptGenerator('Prin000062'),
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 4,
            contactType: 'DISTRICT_SUPERINTENDENT',
            fldcontactdesc: 'Superintendent',
            fldname: 'SC000062',
            fldphone: '444-444-4444',
            fldemail: 'SC000062@test.test',
            ...sampleScriptGenerator('SC000062'),
          },
        ],
      },
    ],
  },
]

const sampleTudaRows = [
  {
    __typename: 'IncidentDetails',
    fldincidentid: 1,
    districts: [
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '0110021',
        name: 'District of Columbia Public Districts',
        tudaDistrictFlag: 'YES',
        jurisdiction: 'District of Columbia Public Districts',
        schoolcount: '2',
        incidentcount: '2',
        hasBeenNotified: 'CONTACT_NEEDED',
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 1,
            contactType: 'DISTRICT_TUDA_COORDINATOR',
            fldcontactdesc: 'District Tuda Coordinator',
            fldname: 'Dr. Gwen Stevens',
            fldphone: '111-111-1111',
            fldemail: 'gwenstevens@test.test',
            ...sampleScriptGenerator('Gwen'),
          },
        ],
      },
    ],
  },
]

const sampleData = transformIncidentDistrict(sampleRows[0])

const phoneTemplates = [
  {
    id: 1,
    primaryType: 'DISTRICT_TEST_COORDINATOR',
    tabDisplayText: 'Phone',
    display: 'match',
    scriptType: 'phoneScript',
  },
  {
    id: 2,
    primaryType: 'DISTRICT_SUPERINTENDENT',
    tabDisplayText: 'Phone',
    display: 'match',
    scriptType: 'phoneScript',
  },
  {
    id: 3,
    primaryType: 'DISTRICT_TEST_COORDINATOR',
    tabDisplayText: 'Voice Mail',
    displayFn: (v) => v !== 'DISTRICT_TUDA_COORDINATOR',
    scriptType: 'voicemailScript',
  },
  {
    id: 4,
    primaryType: 'DISTRICT_TUDA_COORDINATOR',
    tabDisplayText: 'Phone',
    displayFn: (v) => false,
    scriptType: 'phoneScript',
  },
]

const emailTemplates = [
  {
    id: 1,
    primaryType: 'DISTRICT_TEST_COORDINATOR',
    tabDisplayText: 'District Testing Call Recap',
    display: 'match',
    scriptType: 'emailScript',
  },
  {
    id: 2,
    primaryType: 'DISTRICT_SUPERINTENDENT',
    tabDisplayText: 'Superintendent Call Recap',
    display: 'match',
    scriptType: 'emailScript',
  },
  {
    id: 3,
    primaryType: 'DISTRICT_TUDA_COORDINATOR',
    tabDisplayText: 'Incident Recap',
    display: 'match',
    scriptType: 'emailScript',
  },
  {
    id: 4,
    primaryType: 'DISTRICT_TEST_COORDINATOR',
    tabDisplayText: 'No Calls Completed',
    displayFn: (v) => v !== 'DISTRICT_TUDA_COORDINATOR',
    scriptType: 'noCallsCompletedScript',
  },
]

export const Districts = useTemplate({
  incidentId: '01432',
  data: sampleData,
  contactHistory,
  phoneTemplates,
  emailTemplates,
})

export const DistrictsTuda = useTemplate({
  incidentId: '01432',
  data: transformIncidentDistrict(sampleTudaRows[0]),
  contactHistory,
  phoneTemplates,
  emailTemplates,
})

/*
DISTRICT_SUPERINTENDENT
DISTRICT_TEST_COORDINATOR
DISTRICT_TUDA_COORDINATOR
SCHOOL_PRINCIPAL
SCHOOL_COORDINATOR
STATE_NSC
STATE_SAD
STATE_SUPERVISOR
NSC_CONTACT
NSC_CONTACT

*/
