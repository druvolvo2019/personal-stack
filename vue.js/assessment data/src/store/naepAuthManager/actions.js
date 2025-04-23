export function refreshTokenExpired(context) {
  context.commit('setNeedsSecondaryLogin', true)
}

export function refreshTokenReset(context) {
  context.commit('setNeedsSecondaryLogin', false)
}

export function signIn(context) {
  context.commit('signedIn', true)
  context.commit('setNeedsSecondaryLogin', false)
}

export function signOut(context) {
  context.commit('signedIn', false)
  context.commit('setNeedsSecondaryLogin', false)
}
