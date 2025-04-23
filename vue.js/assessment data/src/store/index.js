import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import userprofile from './userprofile'
import questionnaires from './questionnaires'
import filterOptions from './filterOptions'
import naepAuthManager from './naepAuthManager'
import visit from './visit'
import debugging from './debugging'

Vue.use(Vuex)

export const Store = new Vuex.Store({
  modules: {
    // then we reference it
    userprofile,
    questionnaires,
    filterOptions,
    naepAuthManager,
    visit,
    debugging
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

export default function(/* { ssrContext } */) {
  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./userprofile'], () => {
      const newuserprofile = require('./userprofile').default
      Store.hotUpdate({ modules: { userprofile: newuserprofile } })
    })
  }

  return Store
}
