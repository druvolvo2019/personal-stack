import { contextManagerFactory } from '../../lib/contextManagerFactory'

const emailScript = [
  {
    type: 'EMAIL_TO_CC',
    componentName: 'all-email-display-plugin',
  },
  {
    type: 'EMAIL_BODY',
    componentName: 'html-display-plugin',
    data: '<p>Hello World</p>',
  },
]

const context = contextManagerFactory(
  [
    {
      id: 1,
      primaryType: 'School Coordinator',
      tabDisplayText: 'School Coordinator Call Recap',
      script: emailScript,
    },
    {
      id: 2,
      primaryType: 'Principal',
      tabDisplayText: 'Principal Call Recap',
      script: emailScript,
    },
    {
      id: 3,
      primaryType: 'School Coordinator',
      tabDisplayText: 'No Calls Completed',
      script: emailScript,
    },
  ],
  [
    {
      id: 1,
      type: 'School Coordinator',
      name: 'Susan Harrison',
      telephone: '(555) 555-2384',
      extension: '3941',
      email: 'sharrison@riversideelem23.edu',
    },
    {
      id: 2,
      type: 'Principal',
      name: 'Dr. Gwen Stevens',
      telephone: '(555) 555-2354',
      extension: '9834',
      email: 'gstevens@riversideelem23.edu',
    },
  ]
)

export { context }
