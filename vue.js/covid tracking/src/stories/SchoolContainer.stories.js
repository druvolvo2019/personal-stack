import SchoolContainer from '../components/incident-detail/SchoolContainer.vue'
import { transformIncidentDetail } from '../lib/data-transformers'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/SchoolContainer',
  component: SchoolContainer,
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
    components: { SchoolContainer },
    setup() {
      return { args }
    },
    template: `<school-container v-bind="args"></school-container>`,
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
    schools: [
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '0110021',
        name: 'Riverside Elementary School',
        districtName: 'District of Columbia Public Schools',
        jurisdiction: 'DC',
        assessmentDates: ['2022-01-25'],
        makeupDates: [],
        hasBeenNotified: true,
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 1,
            contactType: 'SCHOOL_PRINCIPAL',
            fldcontactdesc: 'Principal',
            fldname: 'Dr. Gwen Stevens',
            fldphone: '111-111-1111',
            fldemail: 'Prin000029@test.test',
            ...sampleScriptGenerator('Gwen'),
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 5,
            contactType: 'SCHOOL_COORDINATOR',
            fldcontactdesc: 'School Coordinator',
            fldname: 'Susan Harrison',
            fldphone: '112-222-2222',
            fldemail: 'sharrison@example.edu',
            ...sampleScriptGenerator('Susan'),
          },
        ],
      },
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '0220022',
        name: 'George Washington Carver Middle',
        districtName: 'District of Columbia Public Schools',
        jurisdiction: 'DC',
        startEndTimes: '8:00am - 3:45pm',
        assessmentDates: ['2022-01-25'],
        makeupDates: ['2022-01-27'],
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 2,
            contactType: 'SCHOOL_COORDINATOR',
            fldcontactdesc: 'School Coordinator',
            fldname: 'SC000040',
            fldphone: '222-222-2222',
            fldemail: 'SC000040@test.test',
            ...sampleScriptGenerator('SC000040'),
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 6,
            contactType: 'SCHOOL_PRINCIPAL',
            fldcontactdesc: 'Principal',
            fldname: 'Prin0220022',
            fldphone: '121-111-1111',
            fldemail: null,
            ...sampleScriptGenerator('Prin0220022'),
          },
        ],
      },
      {
        __typename: 'SampledGradeIncidentDetail',
        id: '0330033',
        name: 'Shady Grove Junior High School',
        grade: 8,
        districtName: 'District of Columbia Public Schools',
        jurisdiction: 'DC',
        assessmentDates: ['2022-01-25', '2022-01-26', '2022-01-27'],
        makeupDates: [],
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 3,
            contactType: 'SCHOOL_PRINCIPAL',
            fldcontactdesc: 'Principal',
            fldname: 'Prin000062',
            fldphone: '333-333-3333',
            fldemail: 'Prin000062@test.test',
            ...sampleScriptGenerator('Prin000062'),
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 4,
            contactType: 'SCHOOL_COORDINATOR',
            fldcontactdesc: 'School Coordinator',
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

const singleSchool = {
  __typename: 'IncidentDetails',
  fldincidentid: 1,
  schools: [
    {
      __typename: 'SampledGradeIncidentDetail',
      id: '0110021',
      name: 'Riverside Elementary School',
      districtName: 'District of Columbia Public Schools',
      jurisdiction: 'DC',
      assessmentDates: ['2022-01-25'],
      makeupDates: [],
      hasBeenNotified: true,
      contacts: [
        {
          __typename: 'ContactDetail',
          fldcontactid: 1,
          contactType: 'SCHOOL_PRINCIPAL',
          fldcontactdesc: 'Principal',
          fldname: 'Dr. Gwen Stevens',
          fldphone: '111-111-1111',
          fldemail: 'Prin000029@test.test',
          ...sampleScriptGenerator('Gwen'),
        },
        {
          __typename: 'ContactDetail',
          fldcontactid: 5,
          contactType: 'SCHOOL_COORDINATOR',
          fldcontactdesc: 'School Coordinator',
          fldname: 'Susan Harrison',
          fldphone: '112-222-2222',
          fldemail: 'sharrison@example.edu',
          ...sampleScriptGenerator('Susan'),
        },
      ],
    },
  ],
}

function generateTemplate(data) {
  const sampleData = transformIncidentDetail(data)
  return useTemplate({
    incidentId: '01432',
    data: sampleData,
    contactHistory,
    phoneTemplates: [
      {
        id: 1,
        primaryType: 'SCHOOL_COORDINATOR',
        tabDisplayText: 'Phone',
        display: 'match',
        scriptType: 'phoneScript',
      },
      {
        id: 2,
        primaryType: 'SCHOOL_PRINCIPAL',
        tabDisplayText: 'Phone',
        display: 'match',
        scriptType: 'phoneScript',
      },
      {
        id: 3,
        primaryType: 'SCHOOL_COORDINATOR',
        tabDisplayText: 'Voice Mail',
        display: 'any',
        scriptType: 'voicemailScript',
      },
    ],
    emailTemplates: [
      {
        id: 1,
        primaryType: 'SCHOOL_COORDINATOR',
        tabDisplayText: 'School Coordinator Call Recap',
        display: 'match',
        scriptType: 'emailScript',
      },
      {
        id: 2,
        primaryType: 'SCHOOL_PRINCIPAL',
        tabDisplayText: 'Principal Call Recap',
        display: 'match',
        scriptType: 'emailScript',
      },
      {
        id: 3,
        primaryType: 'SCHOOL_COORDINATOR',
        tabDisplayText: 'No Calls Completed',
        display: 'any',
        scriptType: 'noCallsCompletedScript',
      },
    ],
  })
}

export const OneSchool = generateTemplate(singleSchool)

export const Schools = generateTemplate(sampleRows[0])

const badDataSchoolsWithNull = {
  __typename: 'IncidentDetails',
  fldincidentid: 1,
  schools: [
    {
      __typename: 'SampledGradeIncidentDetail',
      id: '0110021',
      name: null,
      districtName: null,
      jurisdiction: null,
      assessmentDates: null,
      makeupDates: null,
      hasBeenNotified: null,
      contacts: null,
    },
  ],
}

export const SchoolsWithNull = generateTemplate(badDataSchoolsWithNull)
