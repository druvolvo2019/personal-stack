export function mockEncryptor(tag = '') {
  const encryptionTag = `ENCRYPTED:::${tag}:::`
  return {
    name: 'mockEncryptor',
    encrypt(value) {
      return new Promise(resolve => {
        resolve(value === null ? null : `${encryptionTag}${value}`)
      })
    },
    decrypt(value) {
      return new Promise((resolve, reject) => {
        if (value === null) {
          resolve(null)
        } else if (value.includes(encryptionTag)) {
          resolve(value.replace(encryptionTag, ''))
        } else {
          reject(new Error('Invalid Key'))
        }
      })
    }
  }
}
function nullEncryptor() {
  return {
    name: 'nullEncryptor',
    encrypt(value) {
      return Promise.resolve(value)
    },
    decrypt(value) {
      return Promise.resolve(value)
    }
  }
}

export function nullCryptoAdapterFactory(encryptor) {
  const _encryptor = encryptor || nullEncryptor
  const result = {
    createEncryptor(key, keyData) {
      return _encryptor(key, keyData)
    },
    createEncryptorFromDerivedKey(key, keyData) {
      // Simulate password error

      if (key.match(/!$/)) {
        throw new Error('DecryptionError')
      }
      return _encryptor(key, keyData)
    },
    sha256(value) {
      return Promise.resolve(value)
    },
    generateKey(seed) {
      return Promise.resolve(seed || 'generated-key')
    },
    generateSalt() {
      return ''
    },
    generateIv() {
      return ''
    },
    deriveKey(seed, keyData) {
      return Promise.resolve(seed || 'derived-key')
    },
    importKey(key) {
      return Promise.resolve(key)
    },
    exportKey(key) {
      return Promise.resolve(key)
    }
  }

  return result
}

function getKeyMaterial(password) {
  const enc = new TextEncoder()
  return crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveBits',
    'deriveKey'
  ])
}

export const cryptoAdapter = {
  createEncryptor(key, keyData) {
    const encryptor = {
      encrypt(value) {
        return new Promise(async (resolve, reject) => {
          const enc = new TextEncoder()
          const encodedValue = enc.encode(JSON.stringify(value))
          try {
            const encryptedValue = await crypto.subtle.encrypt(
              {
                name: 'AES-GCM',
                iv: keyData.iv
              },
              key,
              encodedValue
            )

            resolve(encryptedValue)
          } catch (e) {
            if (e.toString() === 'OperationError') {
              reject(new Error('DecryptionError'))
            } else {
              reject(e)
            }
          }
        })
      },
      decrypt(value) {
        return new Promise(async (resolve, reject) => {
          const dec = new TextDecoder()
          try {
            const decrypted = await crypto.subtle.decrypt(
              {
                name: 'AES-GCM',
                iv: keyData.iv
              },
              key,
              value
            )
            const decryptedResult = dec.decode(decrypted)
            resolve(JSON.parse(decryptedResult))
          } catch (e) {
            if (e.toString() === 'OperationError') {
              reject(new Error('DecryptionError'))
            } else {
              reject(e)
            }
          }
        })
      }
    }
    return encryptor
  },
  createEncryptorFromDerivedKey(key, keyData) {
    const self = this
    return new Promise(async resolve => {
      resolve(
        self.createEncryptor(
          await self.deriveKey(await self.sha256(key), keyData),
          keyData
        )
      )
    })
  },
  exportKey(key) {
    return crypto.subtle.exportKey('jwk', key)
  },
  importKey(key) {
    return crypto.subtle.importKey('jwk', key, 'AES-GCM', true, [
      'encrypt',
      'decrypt'
    ])
  },
  deriveKey(seed, keyData) {
    return new Promise(async (resolve, reject) => {
      try {
        const keyMaterial = await getKeyMaterial(seed)
        const key = await crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: keyData.salt,
            iterations: 100000,
            hash: 'SHA-256'
          },
          keyMaterial,
          {
            name: 'AES-GCM',
            length: 256
          },
          true,
          ['encrypt', 'decrypt']
        )

        resolve(key)
      } catch (e) {
        reject(e)
      }
    })
  },
  generateKey() {
    return new Promise(resolve => {
      const key = crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256
        },
        true,
        ['encrypt', 'decrypt']
      )
      resolve(key)
    })
  },
  generateSalt() {
    return crypto.getRandomValues(new Uint8Array(16))
  },
  generateIv() {
    return crypto.getRandomValues(new Uint8Array(12))
  },
  sha256(value) {
    return new Promise(async resolve => {
      const msgUint8 = new TextEncoder().encode(value) // encode as (utf-8) Uint8Array
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8) // hash the message
      const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
      const hashHex = hashArray
        .map(b => b.toString(16).padStart(2, '0'))
        .join('') // convert bytes to hex string
      resolve(hashHex)
    })
  }
}
