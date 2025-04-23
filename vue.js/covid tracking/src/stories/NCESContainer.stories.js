import { createTemplate } from './lib'
import NCESContainer from '../components/incident-detail/NCESContainer.vue'
import {
  transformInitialNCES,
  transformFinalNCES,
} from '../lib/data-transformers'

export default {
  title: 'CIMS/NCESContainer',
  component: NCESContainer,
  argTypes: {
    onSendEmail: {},
    onCloseIncident: {},
    onCloseContact: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { NCESContainer },
    setup() {
      return { args }
    },
    template: `<NCESContainer v-bind="args"></NCESContainer>`,
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

const states = [
  {
    name: 'District of Columbia',
    fips: '11',
    contactStatus: 'NOT_READY',
    schoolCount: 2,
    incidentCount: 2,
  },
  {
    name: 'Maryland',
    fips: '24',
    contactStatus: 'CONTACT_NEEDED',
    schoolCount: 2,
    incidentCount: 2,
  },
  {
    name: 'Virginia',
    fips: '51',
    contactStatus: 'CONTACTED',
    schoolCount: 2,
    incidentCount: 2,
  },
]

const contacts = [
  {
    fldcontactid: 1,
    contactType: 'NCES_CONTACT',
    fldcontactdesc: 'NAEP Sampling & Data Collection Lead',
    fldname: 'Bill Ward',
    fldphone: '555-111-1111',
    phoneext: '3556',
    fldemail: 'wward@NCES23.gov',
    ...sampleScriptGenerator('Bill'),
  },
  {
    fldcontactid: 2,
    contactType: 'ALTERNATE',
    fldcontactdesc: 'NAEP Support & Service Center Lead',
    fldname: 'Gina Broxterman',
    fldphone: '555-111-1111',
    phoneext: '3556',
    fldemail: 'gbroxterman@NCES23.gov',
    ...sampleScriptGenerator('Bill'),
  },
]

console.log({ transformInitialNCES })

export const InitialContactBeforeAssignment = useTemplate({
  incidentId: '01432',
  data: transformInitialNCES({
    initialContact: null,
    finalContact: null,
    states,
    contacts,
  }),
  overrideTitle: 'NCES Initial Contact',
  emailTemplates: [
    {
      id: 1,
      primaryType: 'NCES_CONTACT',
      tabDisplayText: 'NCES Initial Contact',
      display: 'any',
      scriptType: 'emailScript',
    },
  ],
})

export const InitialContactAfterAssignment = useTemplate({
  incidentId: '01432',
  data: transformInitialNCES({
    initialContact: '2022-02-01',
    finalContact: null,
    states,
    contacts,
  }),
  overrideTitle: 'NCES Initial Contact',
  emailTemplates: [
    {
      id: 1,
      primaryType: 'NCES_CONTACT',
      tabDisplayText: 'NCES Initial Contact',
      display: 'any',
      scriptType: 'emailScript',
    },
  ],
})

export const FinalContactNulls = useTemplate({
  incidentId: '01432',
  data: transformFinalNCES({
    initialContact: null,
    finalContact: null,
    states,
    contacts,
  }),
  overrideTitle: 'NCES Final Contact',
  emailTemplates: [
    {
      id: 1,
      primaryType: 'NCES_CONTACT',
      tabDisplayText: 'NCES Final Contact',
      display: 'any',
      scriptType: 'emailScript',
    },
  ],
})

export const FinalContactBeforeCompletion = useTemplate({
  incidentId: '01432',
  data: transformFinalNCES({
    initialContact: '2022-02-01T12:00:00Z',
    finalContact: null,
    states,
    contacts,
  }),
  overrideTitle: 'NCES Final Contact',
  emailTemplates: [
    {
      id: 1,
      primaryType: 'NCES_CONTACT',
      tabDisplayText: 'NCES Final Contact',
      display: 'any',
      scriptType: 'emailScript',
    },
  ],
})

export const FinalContactAfterCompletion = useTemplate({
  incidentId: '01432',
  data: transformFinalNCES({
    initialContact: '2022-02-01T12:00:00Z',
    finalContact: '2022-02-10T12:00:00Z',
    states,
    contacts,
  }),
  overrideTitle: 'NCES Final Contact',
  emailTemplates: [
    {
      id: 1,
      primaryType: 'NCES_CONTACT',
      tabDisplayText: 'NCES Final Contact',
      display: 'any',
      scriptType: 'emailScript',
    },
  ],
})

export const NullData = useTemplate({
  incidentId: '01432',
  data: transformInitialNCES(null),
  overrideTitle: 'NCES Initial Contact',
  emailTemplates: [
    {
      id: 1,
      primaryType: 'NCES_CONTACT',
      tabDisplayText: 'NCES Initial Contact',
      display: 'any',
      scriptType: 'emailScript',
    },
  ],
})

export const NullPiecesOfData = useTemplate({
  incidentId: '01432',
  data: transformInitialNCES({
    initialContact: null,
    finalContact: null,
    states: null,
    contacts: null,
  }),
  overrideTitle: 'NCES Initial Contact',
  emailTemplates: [
    {
      id: 1,
      primaryType: 'NCES_CONTACT',
      tabDisplayText: 'NCES Initial Contact',
      display: 'any',
      scriptType: 'emailScript',
    },
  ],
})
