import * as localForage from 'localforage'

const callStack = () => {
  return new Error().stack
    .split('\n')
    .slice(3)
    .map(x => x.replace('at ', ''))
    .map(x => x.trim())
}

const nullEncryptor = {
  name: 'nullEncryptor',
  encrypt: promiseLoopback,
  decrypt: promiseLoopback
}

function loggingWrapper(delegate) {
  return value => {
    console.log(value)
    return delegate(value)
  }
}

let $memoryStores = {}
export const inspectMemoryStores = () => {
  return Object.values($memoryStores).map(x => x.inspect())
}

export function clearMemoryStores() {
  $memoryStores = {}
}
