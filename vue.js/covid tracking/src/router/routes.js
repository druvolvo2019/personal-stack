const primary = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Incident.vue'),
      },
      {
        path: '/formsummary',
        component: () => import('pages/FormSummary.vue'),
      },

      {
        path: '/ncesinitial',
        component: () => import('pages/NCESInitial.vue'),
      },
      {
        path: '/school',
        component: () => import('pages/School.vue'),
      },
      {
        path: '/district',
        component: () => import('pages/District.vue'),
      },
      {
        path: '/state',
        component: () => import('pages/State.vue'),
      },

      {
        path: '/ncesfinal',
        component: () => import('pages/NCESFinal.vue'),
      },
      {
        path: '/admin',
        component: () => import('pages/Admin.vue'),
      },

      {
        path: '/login',
        component: () => import('pages/Login.vue'),
      },
    ],
  },
]

const devRoutes = [
  {
    path: '/sandbox',
    component: () => import('pages/Sandbox.vue'),
  },
  {
    path: '/assignment-sandbox',
    component: () => import('pages/AssignmentSandbox.vue'),
  },
  {
    path: '/notes-sandbox',
    component: () => import('pages/NotesSandbox.vue'),
  },
]

const development = process.env.NODE_ENV === 'development' ? devRoutes : []

const routes = [
  ...primary,
  ...development,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
