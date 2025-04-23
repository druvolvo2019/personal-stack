export function makeStorageAdapter(storage) {
  let $flushBuffers = () => {
    throw new Error(
      'storage.onOnline was not called prior to trying to flush the buffers!'
    )
  }
  let $flushBuffersWrapper = () => {
    throw new Error(
      'You must call storage.setFlushBuffersWrapper before calling flushBuffers!'
    )
  }
  function createNaepAuthorization(storage) {
    if (!storage.signIn)
      throw new Error('storage must support a call to sign in')
    return {
      signedIn$() {
        return storage.signedIn
      },
      async signIn(username, password, mustExist, userData = {}) {
        try {
          await storage.signIn(username, password, mustExist)
          const existingUserData = await this.readUser()
          const amalgamatedUser = {
            ...existingUserData,
            ...userData,
            username,
            showPII: false,
          }
          await this.writeUser(amalgamatedUser)
          return amalgamatedUser
        } catch (e) {
          switch (e.message) {
            case 'UserDoesNotExist':
              return {
                success: false,
              }
            case 'SigninFailed':
              return {
                success: false,
              }
            default:
              throw e
          }
        }
      },
      signOut() {
        return storage.signOut()
      },
    }
  }
  const naepAuthorization = createNaepAuthorization(storage)

  const naepBufferHandlers = {
    setFlushBuffersWrapper(flushBuffersWrapper) {
      $flushBuffersWrapper = flushBuffersWrapper
    },
    async flushBuffers() {
      await $flushBuffersWrapper($flushBuffers)
    },
  }
  const cache = {}
  const urqlBase = {
    async writeData(delta) {
      Object.assign(cache, delta)
      await storage.setItem('data', JSON.stringify(cache))
    },
    async readData() {
      const local = (await storage.getItem('data')) || null
      Object.assign(cache, JSON.parse(local))
      return cache
    },
    async writeMetadata(data) {
      await storage.setItem('metadata', JSON.stringify(data))
    },
    async readMetadata() {
      const metadataJson = (await storage.getItem('metadata')) || null
      const data = JSON.parse(metadataJson)
      return data
    },
    async updateDataKey(key, callback) {
      this.readData().then(data => {
        const values = JSON.parse(data[key])
        const result = callback(values)
        data[key] = JSON.stringify(result)
        this.writeData(data)
      })
    },
    onOnline(flushBuffers) {
      $flushBuffers = flushBuffers
    },
  }
  const storageFlowthrough = {
    getItem(name) {
      return JSON.parse(storage.getItem(name))
    },
    setItem(name, value) {
      return storage.setItem(name, JSON.stringify(value))
    },
  }
  const userStorage = {
    async readUser() {
      const userData = (await storage.getItem('cachedUser')) || null
      const data = JSON.parse(userData)
      return data
    },
    async writeUser(data) {
      await storage.setItem('cachedUser', JSON.stringify(data))
    },
  }
  const delegate = {
    ...naepAuthorization,
    ...naepBufferHandlers,
    ...urqlBase,
    ...storageFlowthrough,
    ...userStorage,
    get signedIn() {
      return this.signedIn$()
    },
  }

  return new Proxy(storage, {
    get(target, p, receiver) {
      if (delegate[p]) {
        return delegate[p]
      } else {
        return storage[p]
      }
    },
  })
}
