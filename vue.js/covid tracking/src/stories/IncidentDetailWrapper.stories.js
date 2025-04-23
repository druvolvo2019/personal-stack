import IncidentDetailWrapper from '../components/incident-detail/IncidentDetailWrapper.vue'
import {
  transformIncidentDetail,
  transformIncidentDistrict,
} from '../lib/data-transformers'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/IncidentDetailWrapper',
  component: IncidentDetailWrapper,
  argTypes: {
    onItemSelected: {},
    onContactSelected: {},
    onCloseIncident: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { IncidentDetailWrapper },
    setup() {
      return { args }
    },
    template: `<incident-detail-wrapper v-bind="args"></incident-detail-wrapper>`,
  }
})

const sampleRows = [
  {
    __typename: 'IncidentDetails',
    fldincidentid: 1,
    schools: [
      {
        __typename: 'SchoolIncidentDetail',
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
            fldcontactdesc: 'Principal',
            fldname: 'Dr. Gwen Stevens',
            fldphone: '111-111-1111',
            fldemail: 'Prin000029@test.test',
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 5,
            fldcontactdesc: 'School Coordinator',
            fldname: 'Susan Harrison',
            fldphone: '112-222-2222',
            fldemail: 'sharrison@example.edu',
          },
        ],
      },
      {
        __typename: 'SchoolIncidentDetail',
        id: '0220022',
        name: 'George Washington Carver Middle',
        districtName: 'District of Columbia Public Schools',
        jurisdiction: 'DC',
        assessmentDates: ['2022-01-25'],
        makeupDates: ['2022-01-27'],
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 2,
            fldcontactdesc: 'School Coordinator',
            fldname: 'SC000040',
            fldphone: '222-222-2222',
            fldemail: 'SC000040@test.test',
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 6,
            fldcontactdesc: 'Principal',
            fldname: 'Prin0220022',
            fldphone: '121-111-1111',
            fldemail: null,
          },
        ],
      },
      {
        __typename: 'SchoolIncidentDetail',
        id: '0330033',
        name: 'Shady Grove Junior High School',
        districtName: 'District of Columbia Public Schools',
        jurisdiction: 'DC',
        assessmentDates: ['2022-01-25', '2022-01-26', '2022-01-27'],
        makeupDates: [],
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 3,
            fldcontactdesc: 'Principal',
            fldname: 'Prin000062',
            fldphone: '333-333-3333',
            fldemail: 'Prin000062@test.test',
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 4,
            fldcontactdesc: 'School Coordinator',
            fldname: 'SC000062',
            fldphone: '444-444-4444',
            fldemail: 'SC000062@test.test',
          },
        ],
      },
    ],
  },
]

const sampleData = transformIncidentDetail(sampleRows[0])
export const Schools = useTemplate({
  incidentId: '01432',
  data: sampleData,
})

const districtSampleData = [
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
            fldcontactdesc: 'District Testing Coordinator',
            fldname: 'Dr. Gwen Stevens',
            fldphone: '111-111-1111',
            fldemail: 'gwenstevens@test.test',
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 5,
            fldcontactdesc: 'Superintendent',
            fldname: 'Susan Harrison',
            fldphone: '112-222-2222',
            fldemail: 'sharrison@example.edu',
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
        hasBeenNotified: 'NOT_READY',
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 2,
            fldcontactdesc: 'District Testing Coordinator',
            fldname: 'SC000040',
            fldphone: '222-222-2222',
            fldemail: 'SC000040@test.test',
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 6,
            fldcontactdesc: 'Superintendent',
            fldname: 'Prin0220022',
            fldphone: '121-111-1111',
            fldemail: null,
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
        hasBeenNotified: 'CONTACT_NEEDED',
        contacts: [
          {
            __typename: 'ContactDetail',
            fldcontactid: 3,
            fldcontactdesc: 'District Testing Coordinator',
            fldname: 'Prin000062',
            fldphone: '333-333-3333',
            fldemail: 'Prin000062@test.test',
          },
          {
            __typename: 'ContactDetail',
            fldcontactid: 4,
            fldcontactdesc: 'Superintendent',
            fldname: 'SC000062',
            fldphone: '444-444-4444',
            fldemail: 'SC000062@test.test',
          },
        ],
      },
    ],
  },
]

const sampleDataDist = transformIncidentDistrict(districtSampleData[0])

export const Districts = useTemplate({
  incidentId: '01432',
  data: sampleDataDist,
})

const stateSampleData = {
  fldincidentid: '01432',
  locationsData: {
    title: 'States',
    informationTitle: 'State Information',
    list: [
      {
        id: 1,
        displayName: 'District of Columbia',
        caption: 'FIPS-11',
        icon: 'CONTACTED',
        displayInformation: [
          {
            caption: 'State Name',
            displayName: 'District of Columbia',
          },
          {
            caption: 'Contact Required',
            displayName: 'Yes',
          },
          {
            caption: 'Schools involved in this incident',
            displayName: 'Schools (2)',
          },
          {
            caption: 'Count of all incidents in this state',
            displayName: 'Incidents (3)',
          },
        ],
        contactInformation: [
          {
            id: 1,
            title: 'State Coordinator',
            name: 'Gary Jones',
            telephone: '(555) 555-2384',
            extension: '3941',
            email: 'gjones@districtofcolumbia23.edu',
          },
          {
            id: 2,
            title: 'TUDA Coordinator',
            name: 'Bill Clinton',
            telephone: '(555) 555-2284',
            extension: '3841',
            email: 'bclinton@districtofcolumbia23.edu',
          },
        ],
      },
      {
        id: 2,
        displayName: 'Maryland',
        caption: 'FIPS-24',
        icon: 'CONTACT_NEEDED',
        displayInformation: [
          {
            caption: 'State Name',
            displayName: 'Maryland',
          },
          {
            caption: 'Contact Required',
            displayName: 'Yes',
          },
          {
            caption: 'Schools involved in this incident',
            displayName: 'Schools (8)',
          },
          {
            caption: 'Count of all incidents in this state',
            displayName: 'Incidents (13)',
          },
        ],
        contactInformation: [
          {
            id: 1,
            title: 'State Coordinator',
            name: 'Gary Jones',
            telephone: '(555) 555-2384',
            extension: '3941',
            email: 'gjones@maryland.edu',
          },
          {
            id: 2,
            title: 'TUDA Coordinator',
            name: 'Bill Clinton',
            telephone: '(555) 555-2284',
            extension: '3841',
            email: 'bclinton@districtofcolumbia23.edu',
          },
        ],
      },
      {
        id: 3,
        displayName: 'Virginia',
        caption: 'FIPS-51',
        icon: 'NOT_READY',
        displayInformation: [
          {
            caption: 'State Name',
            displayName: 'Virginia',
          },
          {
            caption: 'Contact Required',
            displayName: 'Yes',
          },
          {
            caption: 'Schools involved in this incident',
            displayName: 'Schools (1)',
          },
          {
            caption: 'Count of all incidents in this state',
            displayName: 'Incidents (1)',
          },
        ],
        contactInformation: [
          {
            id: 1,
            title: 'State Coordinator',
            name: 'Gary Jones',
            telephone: '(555) 555-2384',
            extension: '3941',
            email: 'gjones@virginia.edu',
          },
          {
            id: 2,
            title: 'TUDA Coordinator',
            name: 'Bill Clinton',
            telephone: '(555) 555-2284',
            extension: '3841',
            email: 'bclinton@districtofcolumbia23.edu',
          },
        ],
      },
    ],
  },
}

export const States = useTemplate({
  incidentId: '01432',
  data: stateSampleData,
})
