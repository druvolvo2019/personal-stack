import { naepUrqlAdapterFactory } from './naepAuthSrc/naep-urql-adapter'
import { subscribe, publish, naepAuthPublisher } from './naepAuthPublisher'
import { naepSignIn } from './naepAuthSrc/signIn'
import { naepSignOut } from './naepAuthSrc/signOut'
import refreshTokenFactory from './naepAuthSrc/refreshToken'
import authClientAdapter from './naepAuthSrc/authClientAdapter'
import { dataErrorListener } from './naepAuthSrc/dataErrorListener'

/*
  The device is offline if
    authClientAdapter reports info:offline

  The device may be online if
    The navigator switches to online or if navigator.online is true at start
  
  The device is online if
    authClientAdapter reports info:online

*/

function naepAuthOfflineDetectorFactory(window, offlineChanged) {
  let $offlineStatus = !window.navigator.onLine
  window.addEventListener('online', (value) => {
    offlineChanged($offlineStatus, false).then()
    $offlineStatus = false
  })
  window.addEventListener('offline', (value) => {
    offlineChanged($offlineStatus, true).then()
    $offlineStatus = true
  })
  return {
    authClientDetectedChangeTo(offline) {
      offlineChanged($offlineStatus, offline).then()
      $offlineStatus = offline
    },
    get deviceIsOnline() {
      return !$offlineStatus
    },
  }
}

export default async function naepAuthFactory(
  client,
  axiosClient,
  storage,
  loggedInUser,
  globalStoreDispatch
) {
  async function publisher(action, payload) {
    if (action === 'info:online') {
      naepAuthOfflineDetector.authClientDetectedChangeTo(false)
    } else if (action === 'info:offline') {
      naepAuthOfflineDetector.authClientDetectedChangeTo(true)
    }
    naepAuthPublisher(action, {
      ...payload,
      onlineState: naepAuthOfflineDetector.deviceIsOnline,
      signedIn: await loggedInUser.userLoggedIn(),
    })
  }
  const authClient = authClientAdapter(axiosClient, publisher)
  const naepAuthOfflineDetector = naepAuthOfflineDetectorFactory(
    window,
    async (priorOfflineStatus, currentOfflineStatus) => {
      if (priorOfflineStatus !== currentOfflineStatus) {
        try {
          publisher('info:online-status-change', {
            priorOnlineState: !priorOfflineStatus,
            isOnline: !currentOfflineStatus,
          })
          const userLoggedIn = await loggedInUser.userLoggedIn()
          setOnlineStatus(userLoggedIn, !priorOfflineStatus)

          if (!currentOfflineStatus && userLoggedIn) {
            await storage.flushBuffers()
          }
        } catch (e) {
          throw e
        }
      }
    }
  )

  const refreshTokenFn = refreshTokenFactory(
    authClient,
    loggedInUser,
    publisher
  )
  const naepUrqlAdapter = naepUrqlAdapterFactory(
    client,
    storage,
    refreshTokenFn,
    () => globalStoreDispatch('refreshTokenExpired')
  )

  async function signIn(username, password, expiresInSecs = 1200) {
    const result = await naepSignIn(
      username,
      password,
      expiresInSecs,
      authClient,
      storage,
      publisher,
      loggedInUser,
      client.reinitialize$,
      storage.flushBuffers,
      naepUrqlAdapter.rerunFailedActions,
      $initialLoggedInStatus,
      console.log
    )

    globalStoreDispatch(result.success ? 'signIn' : 'signOut')
    setOnlineStatus(
      await loggedInUser.userLoggedIn(),
      naepAuthOfflineDetector.deviceIsOnline
    )

    return result
  }

  let $initialLoggedInStatus
  function setOnlineStatus(loggedIn, online) {
    if (loggedIn) {
      $initialLoggedInStatus = online ? 'logged-in-online' : 'logged-in-offline'
    } else {
      $initialLoggedInStatus = 'not-logged-in'
    }
  }

  setOnlineStatus(
    await loggedInUser.userLoggedIn(),
    naepAuthOfflineDetector.deviceIsOnline
  )

  async function signOut(reason = 'user-action') {
    await naepSignOut(authClient, storage, loggedInUser, publisher, reason)
    globalStoreDispatch('signOut')
    setOnlineStatus(false, naepAuthOfflineDetector.deviceIsOnline)
  }

  function teardown() {
    // $onlineListener.unsubscribe()
  }

  async function signedIn() {
    return loggedInUser.userLoggedIn()
  }

  return {
    signIn,
    signOut,
    get signedIn() {
      return signedIn()
    },
    ...naepUrqlAdapter,
    subscribe,
    teardown,
    loggedInUser,
    get deviceIsOnline() {
      return naepAuthOfflineDetector.deviceIsOnline
    },
    publish,
    errorSubscribe: dataErrorListener.subscribe,
    errorPublish: dataErrorListener.publish,
  }
}
