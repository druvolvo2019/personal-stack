const routes = [
  {
    path: '/',
    component: () => import('layouts/DebugLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/debug',
    component: () => import('layouts/DebugLayout.vue'),
    children: [
      {
        path: 'test-executions',
        name: 'test-executions',
        component: () => import('pages/TestExecutions.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'display-storage',
        name: 'display-storage',
        component: () => import('pages/DisplayStorage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'display-meta',
        name: 'display-meta',
        component: () => import('pages/DisplayMetadata.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'display-user',
        name: 'display-user',
        component: () => import('pages/DisplayUserInformation.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

/*
  
*/

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue')
})

export default routes
