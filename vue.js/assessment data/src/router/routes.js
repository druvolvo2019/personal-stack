const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
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
