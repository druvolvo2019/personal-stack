export function setNeedsSecondaryLogin(state, needsLogin) {
  state.needsSecondaryLogin = needsLogin
}

export function signedIn(state, value) {
  state.signedIn = value
}
