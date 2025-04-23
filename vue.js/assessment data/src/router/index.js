import Vue from 'vue'
import VueRouter from 'vue-router'
const routes = process.env.DEBUGGER
  ? require('./debuggingRoutes').default
  : require('./routes').default
// // import routes from './routes'
// import routes from './debuggingRoutes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    const userLoggedIn = Vue.prototype.$loggedInUser.userLoggedIn()
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (userLoggedIn) {
        next()
      } else {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      }
    } else {
      // if (userLoggedIn) {
      //   Vue.prototype.$loggedInUser.signOut()
      // }
      next()
    }
  })

  return Router
}
