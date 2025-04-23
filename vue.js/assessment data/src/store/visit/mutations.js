import Vue from 'vue'

export function surveyHistory(state, value) {
  Vue.set(state, 'surveyHistory', value)
}

export function sampledGrade(state, value) {
  Vue.set(state, 'sampledGrade', value)
}

export function barcodes(state, value) {
  Vue.set(state, 'barcodes', value)
}

export function subjects(state, value) {
  Vue.set(state, 'subjects', value)
}

export function ndas(state, value) {
  Vue.set(state, 'ndas', value)
}

export function changeLoadingRefCount(state, delta) {
  state.loadingRefCount = state.loadingRefCount + delta
}

export function hardChangeLoadingRefCount(state, count) {
  state.loadingRefCount = count
}

export function updateMakeupSession(state, args) {
  const current = state.sampledGrade.makeupSessions[0]
  state.sampledGrade.makeupSessions.splice(0, 1, {
    ...current,
    makeupDate: args.makeupDate,
    makeupTime: args.makeupTime,
    makeupLocation: args.makeupLocation,
  })
}
