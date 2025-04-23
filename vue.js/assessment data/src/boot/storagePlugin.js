import {
  nullCryptoAdapterFactory,
  cryptoAdapter,
} from 'src/naep-lib/cryptoAdapters'
import {
  createEncryptedStore,
  forageAdapterFactory,
  localStorageFactory,
} from 'src/naep-lib/localForageAdapter'
import { makeStorageAdapter } from 'src/naep-lib/naepAuthSrc/storageAdapter'

export default async ({ app, router, Vue }) => {
  const config = {}
  const kind = 'offline-encrypted'
  switch (kind) {
    case 'offline-encrypted':
      config.storage = createEncryptedStore(
        cryptoAdapter,
        forageAdapterFactory(),
        {
          dbName: 'VSFPersistance',
        }
      )
      break
    case 'default':
      config.storage = createEncryptedStore(
        nullCryptoAdapterFactory(),
        localStorageFactory(),
        {
          dbName: 'VSFPersistanceUnencrypted',
        }
      )
      break
  }

  Vue.prototype.$naepStorage = makeStorageAdapter(config.storage)
}
