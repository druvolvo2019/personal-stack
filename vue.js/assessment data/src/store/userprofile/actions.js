export function updateUserId({ commit }, val) {
  commit('updateUserId', val)
}

export function updateShowPII({ commit }, val) {
  commit('updateShowPII', val)
}

export function togglePII({ commit }) {
  commit('togglePII')
}

export function updateIsAssessmentShowing({ commit }, val) {
  commit('updateIsAssessmentShowing', val)
}

export function updateSchoolName({ commit }, val) {
  commit('schoolName', val)
}

export function updateSessionLabel({ commit }, val) {
  commit('sessionLabel', val)
}

export function logoutUser({ commit }) {
  commit('updateUserId', '')
}

export function showAssessment({ commit }) {
  commit('updateIsAssessmentShowing', true)
}

export function assessmentNotShowing({ commit }) {
  commit('updateIsAssessmentShowing', false)
}

export function updateMakeupCurrentGradeID({ commit }, val) {
  commit('makeupCurrentGradeID', val)
}

export function updateMakeupSavedSession({ commit }, val) {
  commit('makeupSavedSession', val)
}

export function updateTeamReadOnlyCurrent({ commit }, val) {
  commit('teamReadOnlyCurrent', val)
}