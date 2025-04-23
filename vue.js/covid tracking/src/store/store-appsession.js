import { SessionStorage, Loading } from 'quasar'

const state = {
	incidentid: null,
	incidentContact: null,
	reload: false,
	admintab: null
}

const mutations = {
	setIncidentId(state, value) {
		state.incidentid = value
	},
	
	setIncidentContact(state, value) {
		state.incidentContact = value
	},
	
    setReload(state, value) {
		state.reload = value
	},
	
	setAdminTab(state, value) {
		//console.log('admintab=', value)
		state.admintab = value
	}
}


const actions = {
	setIncidentId({ commit }, payload) {
		if (Object.is(payload, null)) {
		}else{
			SessionStorage.set ('incidentId', payload)
			commit('setIncidentId', payload)
			
		}
	},
	
	setIncidentContact({ commit }, payload) {
		if (Object.is(payload, null)) {
		}else{
			SessionStorage.set ('incidentContact', payload)
			commit('setIncidentContact', payload)
		}
	},
	
	setReload({ commit }, payload) {
		if (Object.is(payload, null)) {
		}else{
			SessionStorage.set ('reload', payload)
			commit('setReload', payload)
		}
	},
	
    setAdminTab({ commit }, payload) {
		if (Object.is(payload, null)) {
		}else{
			SessionStorage.set ('admintab', payload)
			commit('setAdminTab', payload)
		}
	},


}
	
const getters = {
	getIncidentId: (state) => {
		var storedIncidentId = state.incidentid
        if (Object.is(storedIncidentId, null)) {
            storedIncidentId = SessionStorage.getItem('incidentId')
		}
		return storedIncidentId
		
	},
	
	getIncidentContact: (state) => {
        var storedIncidentContact = state.incidentContact
        if (Object.is(storedIncidentContact, null)) {
            storedIncidentContact = SessionStorage.getItem('incidentContact')
		}
		return storedIncidentContact
	},
	
	getReload: (state) => {
        var storedReload = state.reload
        if (Object.is(storedReload, null)) {
            storedReload = SessionStorage.getItem('reload')
		}
		return storedReload
	},
	
	getAdminTab: (state) => {
        var storedAdminTab = state.admintab
        if (Object.is(storedAdminTab, null)) {
            storedAdminTab = SessionStorage.getItem('admintab')
		}
		//console.log('tab=', storedAdminTab)
		return storedAdminTab
	},
}
  
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}