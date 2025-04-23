export const encryptionHandler = (delegate, encryptor, encryptKeys) => {
  const keyEncryptor = encryptKeys
    ? k => encryptor.encrypt(k)
    : k => Promise.resolve(k)
  const keyDecryptor = encryptKeys
    ? k => encryptor.decrypt(k)
    : k => Promise.resolve(k)
  const callbackFactory = successCallback => {
    return successCallback
      ? async (error, value) => {
          if (value) {
            successCallback(null, await encryptor.decrypt(value))
          } else {
            successCallback(error)
          }
        }
      : undefined
  }
  return {
    async setItem(key, value, successCallback) {
      return new Promise(async (resolve, reject) => {
        const encryptedValue = await encryptor.encrypt(value)
        resolve(
          await delegate.setItem(
            await keyEncryptor(key),
            encryptedValue,
            successCallback
          )
        )
      })
    },
    async getItem(key, successCallback) {
      return new Promise(async (resolve, reject) => {
        const callbackAdapter = successCallback
          ? callbackFactory(successCallback)
          : undefined
        const result = await delegate.getItem(
          await keyEncryptor(key),
          callbackAdapter
        )
        try {
          if (result === null) {
            resolve(null)
          } else {
            const decryptedResult = await encryptor.decrypt(result)
            resolve(decryptedResult)
          }
        } catch (e) {
          reject(e)
        }
        resolve(result)
      })
    },
    async getRaw(key, callback) {
      return delegate.getItem(await keyEncryptor(key), callback)
    },
    keys(successCallback) {
      return new Promise(async (resolve, reject) => {
        const decryptArray = async values => {
          return await Promise.all(values.map(async x => await keyDecryptor(x)))
        }
        const callbackAdapter = successCallback
          ? async (error, values) => {
              if (values) {
                successCallback(null, await decryptArray(values))
              } else {
                successCallback(error)
              }
            }
          : undefined
        try {
          const partial = delegate.keys(callbackAdapter)
          const result = await partial
          const decryptedResult = await decryptArray(result)
          resolve(decryptedResult)
        } catch (e) {
          reject(e)
        }
      })
    },
    removeItem(key, successCallback) {
      return new Promise(async (resolve, reject) => {
        const callbackAdapter = callbackFactory(successCallback)
        try {
          await delegate.removeItem(await keyEncryptor(key), callbackAdapter)
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}

export const encryptionHandlerDebug = (delegate, encryptor, encryptKeys) => {
  return {
    setItem(key, value, successCallback) {
      return delegate.setItem(key, value, successCallback)
    },
    getItem(key, successCallback) {
      return delegate.getItem(key, successCallback)
    },
    keys(successCallback) {
      return delegate.keys(successCallback)
    },
    removeItem(key, successCallback) {
      return delegate.removeItem(key, successCallback)
    }
  }
}

export function tracingAdapter(storage) {
  return new Proxy(storage, {
    get(target, prop) {
      console.log(prop)
      return target[prop]
    },
    set(target, prop, value) {
      console.log(`setting ${prop}`, value)
      target[prop] = value
      return true
    }
  })
}
