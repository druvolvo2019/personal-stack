export const unauthorizedUser = {
  success: false,
  token: null,
  refreshToken: null,
  issueTime: null,
  expiredIn: 0,
  expiredTime: null,
  user: null,
}

const offlineUser = {
  success: true,
  token: 'offline',
  refreshToken: 'offline',
  issueTime: null,
  expiredIn: 0,
  expiredTime: null,
  user: null,
}

export async function attemptServerSignin(
  username,
  password,
  expiresInSecs,
  authClient,
  publisher
) {
  const loginQuery = `
      query signIn($username: ID!, $password: ID!, $expiresInSecs: Int) {
        signIn(
          username: $username
          password: $password
          expiresInSecs: $expiresInSecs
        ) {
          success
          token
          message
          refreshToken
          issueTime
          expiredIn
          expiredTime
          user {
            firstname
            lastname
            uid
            userRole
            tra {
              territoryCode
              stateCode
              regionCode
              areaCode
              staffID
              roleTypeCode
              superTerritoryCode
            }
          }
        }
      }
    `
  const query = {
    query: loginQuery,
    operationName: 'signIn',
    variables: {
      username,
      password,
      expiresInSecs,
    },
  }
  let userData
  let offline = false
  const res = await authClient.query(query)
  console.log('Login result', { res })
  if (res.offline) {
    offline = true
    userData = offlineUser
  } else {
    userData = await res.signIn
    if (userData.success === false) {
      publisher('error:unauthorized')
      return { ...unauthorizedUser, offline: false }
    }
  }

  return {
    ...userData,
    username,
    offline,
  }
}

export async function signIntoStorage(storage, userData, password, publisher) {
  const { username, offline } = userData
  console.log({ signedIn: storage.signedIn })
  if (storage.signedIn) {
    const currentUser = await storage.readUser()
    console.log({ currentUser, userData })
    if (userData.success) {
      const amalgamatedUser = {
        ...currentUser,
        ...userData,
      }
      await storage.writeUser(amalgamatedUser)
    }
    return userData
  } else {
    if (userData.success === false && userData.token !== 'offline') {
      return unauthorizedUser
    }
    try {
      const incomingUserData = userData.offline ? { offline: true } : userData
      const result = await storage.signIn(
        username,
        password,
        userData.offline,
        incomingUserData
      )
      if (result.success === false) {
        // at this point, if the user is online and the storage sign in failed, then the user has probably changed their password
        if (incomingUserData.offline === false) {
          await storage.removeUser(username)
          publisher('info:clear-store-pw')
          await storage.signIn(username, password, false)
          publisher('info:user-recreated')
          return userData
        } else {
          return unauthorizedUser
        }
      } else {
        return result
      }
    } catch (e) {
      if (e.toString().includes('Invalid username or password') && !offline) {
        await storage.removeUser(username)
        publisher('info:clear-store-pw')
        await storage.signIn(username, password, offline)
        publisher('info:user-recreated')
        return userData
      } else {
        throw e
      }
    }
  }
}

export async function naepSignIn(
  username,
  password,
  expiresInSecs,
  authClient,
  storage,
  publisher,
  loggedInUser,
  reinitializeClientFn,
  flushBuffers,
  rerunFailedActions,
  initialLoginStatus,
  debugLogger
) {
  try {
    const internalDebugLogger = debugLogger || (() => null)
    if (
      (await loggedInUser.userLoggedIn()) &&
      (await loggedInUser.username()) !== username
    ) {
      publisher('error:usernames-do-not-match')
      throw new Error(
        `Usernames do not match. ${await loggedInUser.username()} is logged in. Trying to log in as ${username}`
      )
    }
    const notLoggedInAtStart = !storage.signedIn
    const serverUserData = await attemptServerSignin(
      username,
      password,
      expiresInSecs,
      authClient,
      publisher
    )
    internalDebugLogger({ serverUserData })
    const userData = await signIntoStorage(
      storage,
      serverUserData,
      password,
      publisher
    )
    internalDebugLogger({ userData })

    // need to know if we transitioned from offline to online

    if (notLoggedInAtStart) {
      reinitializeClientFn()
    } else if (!userData.offline) {
      switch (initialLoginStatus) {
        case 'logged-in-offline':
          flushBuffers()
          break
        case 'logged-in-online':
          rerunFailedActions()
          break
      }
    }

    return userData
  } catch (e) {
    publisher('error:sign-in', { error: e })
    console.error(e)
  }
}
