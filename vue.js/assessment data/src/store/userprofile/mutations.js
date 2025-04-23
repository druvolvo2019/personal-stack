export const updateUserId = (state, val) => {
  switch (val) {
    case 'heidi.tran@naepmail.westat.com':
      state.userId = val
      state.userRole = 'SV'
      state.userName = 'Heidi Tran'
      state.internalAuthenticated = true
      break
    case 'sally.richardson@naepmail.westat.com':
      state.userId = val
      state.userRole = 'AC'
      state.userName = 'Sally Richardson'
      state.internalAuthenticated = true
      state.fieldArea = 'T21:MD-2/1'
      break
    case '':
      state.userId = ''
      state.userRole = ''
      state.userName = ''
      state.internalAuthenticated = false
      break
    default:
      console.log(val.toString(), new Error().stack())
      state.userId = ''
      state.userRole = ''
      state.userName = ''
      state.internalAuthenticated = false
  }
}

export const togglePII = state => {
  state.showPII = !state.showPII
}

export const updateShowPII = (state, val) => {
  state.showPII = val
}

export const updateIsAssessmentShowing = (state, val) => {
  state.isAssessmentShowing = val
}

export const updateSchoolName = (state, val) => {
  state.schoolName = val
}

export const updateSessionLabel = (state, val) => {
  state.sessionLabel = val
}

export const updateMakeupCurrentGradeID = (state, val) => {
  state.makeupCurrentGradeID = val
}

export const updateMakeupSavedSession = (state, val) => {
     Object.assign(state.makeupSavedSession,val)
}

export const updateTeamReadOnlyCurrent = (state, val) => {
     state.teamReadOnlyCurrent = val
}