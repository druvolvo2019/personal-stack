import { encryptionHandler } from './encryptionHandler'

export function createAdapter(storageInstance, defaultOptions) {
  const { encryptor, encryptKeys } = defaultOptions
  const encryptHandler = encryptionHandler(
    storageInstance,
    encryptor,
    encryptKeys
  )
  return new Proxy(storageInstance, {
    get(target, prop) {
      if (Object.keys(encryptHandler).includes(prop)) {
        return encryptHandler[prop]
      } else {
        switch (prop) {
          case 'createInstance':
            return (config, options = {}) => {
              return createAdapter(storageInstance.createInstance(config), {
                ...defaultOptions,
                ...options
              })
            }
          case 'dropInstance':
            return (...args) => {
              storageInstance.dropInstance(...args)
            }
          case 'signIn':
            return (username, password) => {
              if (encryptor.signIn) {
                storageInstance.config({
                  name: `${username}::AwsStore`
                })
                encryptor.signIn(username, password)
              }
            }
          default:
            return storageInstance[prop]
        }
      }
    },
    set(target, prop, value) {
      storageInstance[prop] = value
      return true
    }
  })
}
