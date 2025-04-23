export const memoryStorageAdapter = () => {
  let $store = {}
  let $signedIn = false
  return {
    $store,
    signIn(username, password, mustExist) {
      if (username === 'UserDoesNotExist') {
        throw new Error('UserDoesNotExist')
      } else if (username === 'SigninFailed') {
        throw new Error('SigninFailed')
      } else {
        $signedIn = true
      }
    },
    signOut() {
      $signedOut = false
      $store = {}
    },
    get signedIn() {
      return $signedIn
    },
    getItem(key) {
      return Promise.resolve($store[key])
    },
    setItem(key, value) {
      return new Promise(resolve => {
        $store[key] = value
        resolve()
      })
    },
    removeItem(key) {
      return new Promise(resolve => {
        delete $store[key]
        resolve()
      })
    }
  }
}
