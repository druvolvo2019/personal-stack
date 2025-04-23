// src/store/showcase/state.js
// Always use a function to return state if you use SSR
export default function() {
  return {
    id: '',
    name: '',
    role: '',
    internalAuthenticated: false,
    showPII: false,
    isAssessmentShowing: false,
    schoolName: '',
    sessionLabel: '',
    fieldArea: '',
    makeupCurrentGradeID:'',
    makeupSavedSession: {},
    teamReadOnlyCurrent: false
  }
}
