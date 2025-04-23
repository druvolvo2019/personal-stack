import { runSaveLogout } from 'src/lib/dataSource'
import { SessionStorage, Loading } from 'quasar'
import { setWithExpiry, getWithExpiry } from 'src/lib/auth-expiration'

const state = {
  loggedIn: false,
  user: {
    userid: '',
    userfirstname: '',
    userlastname: '',
    useremail: '',
    flgsysactive: false,
    flglocked: false,
    flgdisabled: false,
    fldrole: '',
  },
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
    state.sessionLoggedIn = value
  },
  addUser(state, payload) {
    state.user.userid = payload.userid
    state.user.userfirstname = payload.userfirstname
    state.user.userlastname = payload.userlastname
    state.user.useremail = payload.useremail
    state.user.flgsysactive = payload.flgsysactive
    state.user.flglocked = payload.flglocked
    state.user.flgdisabled = payload.flgdisabled
    state.user.fldrole = payload.fldrole
  },
}

const actions = {
  loginUser({ commit }, payload) {
    commit('setLoggedIn', true)
    setWithExpiry('loggedIn', true)
    if (Object.is(payload, null)) {
      payload = {
        userid: '',
        userfirstname: '',
        userlastname: '',
        useremail: '',
        flgsysactive: false,
        flglocked: false,
        flgdisabled: false,
        fldrole: '',
      }
    }
    commit('addUser', payload)
    SessionStorage.set('loggedUser', payload)
  },
  async logoutUser({ commit }, payload) {
    Loading.show()

    if (Object.is(payload, null)) {
      payload = {
        userid: '',
        userfirstname: '',
        userlastname: '',
        useremail: '',
        flgsysactive: false,
        flglocked: false,
        flgdisabled: false,
        fldrole: '',
      }
    }

    commit('addUser', payload)
    commit('setLoggedIn', false)
    SessionStorage.remove('loggedIn', payload)
    SessionStorage.remove('loggedUser', payload)

    if (payload.useremail !== '') {
      let useremail = {
        useremail: payload.useremail,
      }

      const r = await runSaveLogout(useremail)
      if (r.status == 200) {
      } else {
        Loading.hide()
      }
    }

    Loading.hide()
    this.$router.replace('/login')
  },

  addUser({ commit }, payload) {
    if (Object.is(payload, null)) {
      payload = {
        userid: '',
        userfirstname: '',
        userlastname: '',
        useremail: '',
        flgsysactive: false,
        flglocked: false,
        flgdisabled: false,
        fldrole: '',
      }
    }
    commit('addUser', payload)
    SessionStorage.set('loggedUser', payload)
  },
  setLoggedIn({ commit }, payload) {
    if (Object.is(payload, null)) {
      payload = false
    }
    commit('setLoggedIn', payload)
    setWithExpiry('loggedIn', payload)
  },

  cleanUpWhenTimeExpired({ commit }) {
    let payload = {
      userid: '',
      userfirstname: '',
      userlastname: '',
      useremail: '',
      flgsysactive: false,
      flglocked: false,
      flgdisabled: false,
      fldrole: '',
    }
    commit('addUser', payload)
    commit('setLoggedIn', false)
    SessionStorage.remove('loggedIn', payload)
    SessionStorage.remove('loggedUser', payload)
  },

  handleAuthStateChange({ commit }) {
    var storedUser = SessionStorage.getItem('loggedUser')
    if (Object.is(storedUser, null)) {
      storedUser = {
        userid: '',
        userfirstname: '',
        userlastname: '',
        useremail: '',
        flgsysactive: false,
        flglocked: false,
        flgdisabled: false,
        fldrole: '',
      }
    }
    commit('addUser', storedUser)
    var storedLoggeIn = getWithExpiry('loggedIn')
    if (Object.is(storedLoggeIn, null)) {
      storedLoggeIn = false
    }
    commit('setLoggedIn', storedLoggeIn)
    if (storedLoggeIn) {
      setWithExpiry('loggedIn', true)
      SessionStorage.set('loggedUser', storedUser)
    } else {
      commit('setLoggedIn', false)
      let payload = {
        userid: '',
        userfirstname: '',
        userlastname: '',
        useremail: '',
        flgsysactive: false,
        flglocked: false,
        flgdisabled: false,
        fldrole: '',
      }
      setWithExpiry('loggedIn', payload)
      commit('addUser', payload)
      this.$router.replace('/login')
    }
  },
}

const getters = {
  getloggedIn: (state) => {
    return state.loggedIn
  },
  getUser: (state) => {
    return state.user
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
