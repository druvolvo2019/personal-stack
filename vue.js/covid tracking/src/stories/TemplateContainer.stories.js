import { createTemplate } from './lib'
import TemplateContainer from '../components/incident-detail/TemplateContainer.vue'
import { sampleHtml } from './assets/CIMS_56.js'

export default {
  title: 'CIMS/TemplateContainer',
  components: {
    TemplateContainer,
  },
  argTypes: {
    onContextChanged: {},
    onCallHandled: {},
    onContactSelected: {},
    onItemSelected: {},
    onSendEmail: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { TemplateContainer },
    setup() {
      return { args }
    },
    template: `<template-container v-bind="args"></template-container>`,
  }
})

export const EmptyContainer = useTemplate({})

const emailScript = [
  {
    type: 'EMAIL_TO_CC',
    componentName: 'all-email-display-plugin',
  },
  {
    type: 'EMAIL_BODY',
    componentName: 'html-display-plugin',
    data: sampleHtml,
  },
  {
    type: 'SEND_EMAIL',
    componentName: 'send-email-plugin',
  },
]

export const EmailSchoolContainer = useTemplate({
  incidentId: '1140011',
  title: 'Email Templates',
  templates: [
    {
      id: 1,
      primaryType: 'School Coordinator',
      tabDisplayText: 'School Coordinator Call Recap',
      display: 'match',
      scriptType: 'emailScript',
    },
    {
      id: 3,
      primaryType: 'School Coordinator',
      tabDisplayText: 'No Calls Completed',
      display: 'any',
      scriptType: 'emailScript',
    },
  ],
  contacts: [
    {
      id: 1,
      type: 'School Coordinator',
      name: 'Susan Harrison',
      telephone: '(555) 555-2384',
      extension: '3941',
      email: 'sharrison@riversideelem23.edu',
      emailScript: emailScript,
    },
    {
      id: 2,
      type: 'Principal',
      name: 'Dr. Gwen Stevens',
      telephone: '(555) 555-2354',
      extension: '9834',
      email: 'gstevens@riversideelem23.edu',
      emailScript: emailScript,
    },
  ],
  currentContact: {
    id: 1,
    type: 'School Coordinator',
    name: 'Susan Harrison',
    telephone: '(555) 555-2384',
    extension: '3941',
    email: 'sharrison@riversideelem23.edu',
    emailScript: emailScript,
  },
})

function generatePhoneScript(name) {
  return [
    {
      type: 'PHONE_HEADER',
      componentName: 'html-display-plugin',
      data: 'Phone header',
    },
    {
      type: 'PHONE_REACHED_PERSON_ACTION',
      componentName: 'phone-reached-plugin',
    },
    {
      type: 'PHONE_BODY',
      componentName: 'html-display-plugin',
      data: `Phoning <b>${name}</b> body`,
    },
    {
      type: 'PHONE_ENDING',
      componentName: 'html-display-plugin',
      data: 'Phone ending',
    },
    {
      type: 'PHONE_COMPLETE_ACTION',
      componentName: 'call-complete-plugin',
    },
  ]
}

function generateVoicemailScript(name) {
  return [
    {
      type: 'PHONE_BODY',
      componentName: 'html-display-plugin',
      data: `Leaving voicemail for <b>${name}</b> body`,
    },
  ]
}

export const PhoneSchoolContainer = useTemplate({
  incidentId: '1140011',
  title: 'Phone Script',
  templates: [
    {
      id: 1,
      primaryType: 'School Coordinator',
      tabDisplayText: 'Phone',
      display: 'match',
      scriptType: 'phoneScript',
    },
    {
      id: 2,
      primaryType: 'School Coordinator',
      tabDisplayText: 'Voice Mail',
      display: 'match',
      scriptType: 'voicemailScript',
    },
  ],
  contacts: [
    {
      id: 1,
      type: 'School Coordinator',
      name: 'Susan Harrison',
      telephone: '(555) 555-2384',
      extension: '3941',
      email: 'sharrison@riversideelem23.edu',
      phoneScript: generatePhoneScript('Susan Harrison'),
      voicemailScript: generateVoicemailScript('Susan'),
    },
    {
      id: 2,
      type: 'Principal',
      name: 'Dr. Gwen Stevens',
      telephone: '(555) 555-2354',
      extension: '9834',
      email: 'gstevens@riversideelem23.edu',
      phoneScript: generatePhoneScript('Gwen Stevens'),
      voicemailScript: generateVoicemailScript('Gwen'),
    },
  ],
  currentContact: {
    id: 1,
    type: 'School Coordinator',
    name: 'Susan Harrison',
    telephone: '(555) 555-2384',
    extension: '3941',
    email: 'sharrison@riversideelem23.edu',
    phoneScript: generatePhoneScript('Susan Harrison'),
    voicemailScript: generateVoicemailScript('Susan'),
  },
})
