import { Store } from 'src/store'
export const REFRESH_TOKEN_EXPIRED = 'refresh-token:expired'
export const OFFLINE_TOKEN = 'refresh-token:offline'
const refreshQry = `
      mutation refresh($token: ID!) {
        refreshToken(refreshtoken: $token) {
          success
          token
          refreshToken
          expiredTime
          issueTime
        }
      }
    `
const mutation = (token) => {
  return {
    query: refreshQry,
    variables: { token },
  }
}

let $debounce = false
let $debounceTimeout
const tokenValidState = {
  considerValid: false,
  timeoutHandle: undefined,
}

const tokenIsWithinThreshold = () => {
  return tokenValidState.considerValid
}

const clearTokenValidTimeout = () => {
  if (tokenValidState.timeoutHandle) {
    clearTimeout(tokenValidState.timeoutHandle)
    tokenValidState.timeoutHandle = undefined
  }
  tokenValidState.considerValid = false
}

const setTokenValidFor = (millisecondRefreshThreshold) => {
  clearTokenValidTimeout()
  if (millisecondRefreshThreshold === 0) {
    return
  }
  tokenValidState.considerValid = true
  tokenValidState.timeoutHandle = setTimeout(() => {
    console.log('Token will be requested on next call')
    clearTokenValidTimeout()
  }, millisecondRefreshThreshold)
}

const clearTokenValid = () => {
  clearTokenValidTimeout()
}

export default function refreshTokenFactory(
  authClient,
  loggedInUser,
  publisher,
  millisecondRefreshThreshold = 60000
) {
  clearTokenValid()
  return async () => {
    const currentRefreshToken = await loggedInUser.getRefreshToken()
    if ((currentRefreshToken || null) === null) {
      console.log(await loggedInUser.$fullUserObject())
    }

    if (Store.getters['debugging/refreshTokenAlwaysValid']) {
      return `${currentRefreshToken}:always`
    }
    if (!Store.getters['debugging/refreshTokenValid']) {
      publisher('error:refresh-token-expired')
      return REFRESH_TOKEN_EXPIRED
    }
    if (tokenIsWithinThreshold()) {
      return await loggedInUser.$fullUserObject()
    }
    // if (await loggedInUser.tokenIssuedWithinMs(millisecondRefreshThreshold)) {
    //   return await loggedInUser.$fullUserObject()
    // }
    const defaultResponse = {
      offline: false,
      refreshToken: {
        success: false,
      },
    }
    const data = currentRefreshToken
      ? (await authClient.mutate(mutation(currentRefreshToken))) ||
        defaultResponse
      : defaultResponse
    if (data.offline) {
      clearTokenValid()
      return OFFLINE_TOKEN
    } else {
      const refreshToken = data.refreshToken
      if (refreshToken.success) {
        await loggedInUser.resetToken(refreshToken)
        setTokenValidFor(millisecondRefreshThreshold)
        publisher('info:token-refreshed')
        return refreshToken
      } else {
        clearTokenValid()
        publisher('error:refresh-token-expired')
        return REFRESH_TOKEN_EXPIRED
      }
    }
  }
}
