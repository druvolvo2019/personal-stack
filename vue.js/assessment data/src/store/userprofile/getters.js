export function getSessionLabel(state) {
  return state.sessionLabel
}

export function getSchoolName(state) {
  return state.schoolName
}

export function getIsAssessmentShowing(state) {
  return state.isAssessmentShowing
}

export function getShowPII(state) {
  return state.showPII
}

export function getFieldArea(state) {
  return state.fieldArea
}

export function getUser(state) {
  const { userId, userName, userRole, internalAuthenticated, showPII, fieldArea } = state
  return { userId, userName, userRole, authenticated: internalAuthenticated, showPII, fieldArea }
}

export function getMakeupCurrentGradeID(state) {
  return state.makeupCurrentGradeID
}

export function getMakeupSavedSession(state) {
  return state.makeupSavedSession
}

export function getTeamReadOnlyCurrent(state) {
  return state.teamReadOnlyCurrent
}