import ScriptDisplayPlugin from '../components/incident-detail/TemplateContainerComponents/ScriptDisplayPlugin.vue'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/ScriptDisplayPlugin',
  component: ScriptDisplayPlugin,
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
    components: { ScriptDisplayPlugin },
    setup() {
      return { args }
    },
    template: `<script-display-plugin v-bind="args"></script-display-plugin>`,
  }
})

function generateEmailScript(name) {
  const sampleHtml = `<html><body><h1>Hello ${name}</h1><div>This is some <b>placeholder</b> text</div></body></html>`

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
    {
      type: 'PHONE_REACHED_PERSON_ACTION',
      componentName: 'phone-reached-plugin',
    },
  ]
  return emailScript
}

function generatePREmailScript(name) {
  const sampleHtml = `<html><body><h1>Hola, ¿este es mi amigo ${name}? Tenemos una evaluación.</h1></body></html>`

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
    {
      type: 'PHONE_REACHED_PERSON_ACTION',
      componentName: 'phone-reached-plugin',
    },
  ]
  return emailScript
}

const templates = [
  {
    id: 1,
    primaryType: 'School Coordinator',
    tabDisplayText: 'School Coordinator Call Recap',
    display: 'match',
    scriptType: 'emailScript',
  },
  {
    id: 2,
    primaryType: 'Principal',
    tabDisplayText: 'Principal Call Recap',
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
]
const contacts = [
  {
    id: 1,
    type: 'School Coordinator',
    name: 'Susan Harrison',
    telephone: '(555) 555-2384',
    extension: '3941',
    email: 'sharrison@riversideelem23.edu',
    emailScript: generateEmailScript('Susan Harrison'),
  },
  {
    id: 2,
    type: 'Principal',
    name: 'Dr. Gwen Stevens',
    telephone: '(555) 555-2354',
    extension: '9834',
    email: 'gstevens@riversideelem23.edu',
    emailScript: generateEmailScript('Gwen Stevens'),
  },
]

export const ExampleHtml = useTemplate({
  templates,
  contacts,
  currentContact: {
    id: 2,
    type: 'Principal',
    name: 'Dr. Gwen Stevens',
    telephone: '(555) 555-2354',
    extension: '9834',
    email: 'gstevens@riversideelem23.edu',
    emailScript: generateEmailScript(''),
  },
})

export const ExamplePRHtml = useTemplate({
  templates,
  contacts: [
    {
      id: 1,
      type: 'School Coordinator',
      name: 'Susan Harrison',
      telephone: '(555) 555-2384',
      extension: '3941',
      email: 'sharrison@riversideelem23.edu',
      emailScript: generatePREmailScript('Susan Harrison'),
    },
    {
      id: 2,
      type: 'Principal',
      name: 'Dr. Gwen Stevens',
      telephone: '(555) 555-2354',
      extension: '9834',
      email: 'gstevens@riversideelem23.edu',
      emailScript: generatePREmailScript('Gwen Stevens'),
    },
  ],
  currentContact: {
    id: 2,
    type: 'Principal',
    name: 'Dr. Gwen Stevens',
    telephone: '(555) 555-2354',
    extension: '9834',
    email: 'gstevens@riversideelem23.edu',
    emailScript: generateEmailScript(''),
  },
})
