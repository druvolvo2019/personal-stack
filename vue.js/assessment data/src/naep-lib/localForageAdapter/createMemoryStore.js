let $memoryStores = {}
export const inspectMemoryStores = () => {
  return Object.values($memoryStores).map(x => x.inspect())
}

export function clearMemoryStores() {
  $memoryStores = {}
}
export function createMemoryStore(config = {}) {
  const $store = {}
  const initialSettings = {
    name: 'memoryStore',
    storeName: 'keyvaluepairs',
    ...config
  }
  let $loggingEnabled = false
  function loginfo(...args) {
    if ($loggingEnabled) {
      console.log(...args)
    }
  }
  const memoryStoreKey = `${initialSettings.name}/${initialSettings.storeName}`
  const result = $memoryStores[memoryStoreKey] || {
    ...initialSettings,
    setLogging(value) {
      $loggingEnabled = value
    },
    $store,
    inspect(key) {
      const lookup = key || memoryStoreKey
      const { name, storeName, $store } = $memoryStores[lookup]
      return {
        key: lookup,
        name,
        storeName,
        $store
      }
    },
    createInstance(config, opts) {
      return createMemoryStore(config)
    },
    dropInstance() {
      delete $memoryStores[memoryStoreKey]
      loginfo('dropInstance', memoryStoreKey, inspectMemoryStores())
    },
    setItem(entry, value, callback) {
      return new Promise(resolve => {
        $store[entry] = value
        if (callback) {
          callback(null, value)
        }
        loginfo('setItem', entry, value, this.inspect(memoryStoreKey))
        resolve(value)
      })
    },
    getItem(entry, callback) {
      return new Promise(resolve => {
        const value = $store[entry] || null
        if (callback) {
          callback(null, value)
        }
        loginfo('getItem', entry, value, this.inspect(memoryStoreKey))
        loginfo(inspectMemoryStores())
        resolve(value)
      })
    },
    removeItem(entry, callback) {
      return new Promise(resolve => {
        const value = $store[entry] || null
        delete $store[entry]
        loginfo('removeItem', entry, this.inspect(memoryStoreKey))
        if (callback) {
          callback(null, value)
        }
        resolve(value)
      })
    },
    keys(callback) {
      return new Promise(resolve => {
        const keys = Object.keys($store)
        if (callback) {
          callback(null, keys)
        }
        resolve(keys)
      })
    },
    getRaw(entry) {
      return new Promise(resolve => {
        resolve($store[entry])
      })
    }
  }
  $memoryStores[memoryStoreKey] = result
  loginfo(inspectMemoryStores())
  return result
}
