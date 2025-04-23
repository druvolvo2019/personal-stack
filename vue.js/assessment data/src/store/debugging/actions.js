export function setRefreshTokenValid({ commit }, value) {
  commit('refreshTokenValid', value)
}

export function setApiKeyValid({ commit }, value) {
  commit('apiKeyValid', value)
}

export function setRefreshTokenAlwaysValid({ commit }, value) {
  commit('refreshTokenAlwaysValid', value)
}
