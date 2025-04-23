import auth from './store-auth'
import appsession from './store-appsession'

// default src/store/index.js content:
import { createStore } from 'vuex'
// import example from './module-example'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      auth,
      appsession
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  })

  return Store
}

