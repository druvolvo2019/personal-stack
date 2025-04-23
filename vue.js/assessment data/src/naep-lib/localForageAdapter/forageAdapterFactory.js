import * as localForage from 'localforage'
import { createAdapter } from './createAdapter'

const nullEncryptor = {
  name: 'nullEncryptor',
  encrypt: k => Promise.resolve(k),
  decrypt: k => Promise.resolve(k)
}

export function forageAdapterFactory() {
  return createAdapter(localForage, {
    encryptor: nullEncryptor,
    encryptKeys: false
  })
}

export function localStorageFactory() {
  return createAdapter(localForage, {
    encryptor: nullEncryptor,
    encryptKeys: false
  })
}
