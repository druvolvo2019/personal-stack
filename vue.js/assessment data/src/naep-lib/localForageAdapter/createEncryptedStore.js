import { createMemoryStore } from './createMemoryStore'
import { createAdapter } from './createAdapter'

const nullEncryptor = {
  name: 'nullEncryptor',
  encrypt: k => Promise.resolve(k),
  decrypt: k => Promise.resolve(k)
}

export function createEncryptedStore(
  cryptoAdapter,
  storage,
  options = {},
  sessionStore = sessionStorage
) {
  const { dbName } = {
    dbName: 'VSF',
    ...options
  }
  const defaultStore = createMemoryStore()

  const storeKey = `${dbName}::storage::store`
  const storeManager = {
    initialize(usernameAsSha256, keyAsJwk) {
      sessionStore.setItem(
        storeKey,
        JSON.stringify({
          usernameAsSha256,
          keyAsJwk
        })
      )
    },
    get isDefaultStore() {
      return (sessionStore.getItem(storeKey) || null) === null
    },
    async current() {
      const data = sessionStore.getItem(storeKey)
      if (data) {
        const { usernameAsSha256, keyAsJwk } = JSON.parse(data)
        const keyDataStore = createKeyDataStore()
        const keyData = await keyDataStore.getItem(usernameAsSha256)
        const key = await cryptoAdapter.importKey(keyAsJwk)
        return createStore(
          usernameAsSha256,
          cryptoAdapter.createEncryptor(key, keyData)
        )
      } else {
        return defaultStore
      }
    },
    clearStore() {
      sessionStore.removeItem(storeKey)
    }
  }

  const storageAdapter = createAdapter(storage, {
    encryptor: nullEncryptor,
    encryptKeys: false
  })

  function createKeyDataStore() {
    return storageAdapter.createInstance({
      name: dbName,
      storeName: 'keyDataStore'
    })
  }

  function createKeyStore(encryptor) {
    return storageAdapter.createInstance(
      {
        name: dbName,
        storeName: 'keyStore'
      },
      {
        encryptor,
        encryptKeys: false
      }
    )
  }

  function createStore(usernameAsSha256, encryptor) {
    return storageAdapter.createInstance(
      {
        name: dbName,
        storeName: usernameAsSha256
      },
      {
        encryptor,
        encryptKeys: false
      }
    )
  }

  return {
    debugGetStore() {
      return storeManager.current
    },
    async signIn(username, password, mustExist) {
      const keyDataStore = createKeyDataStore()
      const usernameAsSha256 = await cryptoAdapter.sha256(username)
      let keyData = await keyDataStore.getItem(usernameAsSha256)
      try {
        if (keyData === null) {
          if (mustExist) {
            throw new Error('UserDoesNotExist')
          } else {
            keyData = {
              salt: cryptoAdapter.generateSalt(),
              iv: cryptoAdapter.generateIv()
            }
            await keyDataStore.setItem(usernameAsSha256, keyData)
          }
        }
        const keyStore = createKeyStore(
          await cryptoAdapter.createEncryptorFromDerivedKey(
            username + '`' + password,
            keyData
          )
        )
        let key
        let keyAsJwk = await keyStore.getItem(usernameAsSha256)
        if (keyAsJwk === null) {
          if (mustExist) {
            throw new Error('SigninFailed')
          } else {
            key = await cryptoAdapter.generateKey()
            keyAsJwk = await cryptoAdapter.exportKey(key)
            await keyStore.setItem(usernameAsSha256, keyAsJwk)
          }
        } else {
          key = await cryptoAdapter.importKey(keyAsJwk)
        }
        storeManager.initialize(usernameAsSha256, keyAsJwk)
      } catch (e) {
        if (e.message === 'DecryptionError') {
          throw new Error('SigninFailed')
        } else {
          throw e
        }
      }
    },
    get signedIn() {
      return !storeManager.isDefaultStore
    },
    signOut() {
      storeManager.clearStore()
    },
    async removeUser(username) {
      this.signOut()
      // TODO remove keyStoreData
      const keyDataStore = createKeyDataStore()
      const keyStore = createKeyStore(nullEncryptor)
      const usernameAsSha256 = await cryptoAdapter.sha256(username)
      await keyDataStore.removeItem(usernameAsSha256)
      await keyStore.removeItem(usernameAsSha256)
      await storageAdapter.dropInstance({
        name: dbName,
        storeName: usernameAsSha256
      })
    },
    async setItem(...args) {
      const partial = await storeManager.current()
      await partial.setItem(...args)
    },
    async getItem(...args) {
      const partial = await storeManager.current()
      return partial.getItem(...args)
    },
    async removeItem(...args) {
      const partial = await storeManager.current()
      return partial.removeItem(...args)
    },
    async keys(...args) {
      const partial = await storeManager.current()
      return partial.keys(...args)
    },
    async getRaw(entry) {
      const partial = await storeManager.current()
      return partial.getRaw(entry)
    }
  }
}
