import state from '../userprofile/state'

export function isNotFullyLoaded(state) {
  return [
    state.surveyHistory,
    state.sampledGrade,
    state.ndas,
    state.barcodes,
  ].some(x => x === null)
}

export function surveyHistory(state) {
  return state.surveyHistory
}

export function sampledGrade(state) {
  return state.sampledGrade
}

export function ndas(state) {
  return state.ndas
}

export function barcodes(state) {
  return state.barcodes
}

export function getSubjects(state) {
  return state.subjects
}
