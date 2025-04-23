import Vue from 'vue'

export function setVisitList(state, list) {
  Vue.set(state, 'visitListForTra', list)
}

export function setValidTras(state, list) {
  Vue.set(state, 'validTras', list)
}

export function visitListLoadingState(state, value) {
  state.visitListLoadingState = value
}

export function validTrasLoadingState(state, value) {
  state.validTrasLoadingState = value
}

export function setDeviceIsOnline(state, value) {
  state.deviceIsOnline = value
}
