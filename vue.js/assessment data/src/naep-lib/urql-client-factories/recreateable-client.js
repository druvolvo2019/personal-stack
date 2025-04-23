import { createClient, dedupExchange, fetchExchange, debugExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { offlineExchange } from '@urql/exchange-graphcache'
import schema from '../schema.json'
import { fetchOptionsExchange } from './fetchOptionsExchange'
import { Store } from 'src/store'

export function recreateableClient(
  offlineSupport,
  graphqlConfig,
  storage,
  getTokenFn,
  loggedInUser
) {
  function getApiKey() {
    return Store.getters['debugging/apiKeyValid']
      ? graphqlConfig.apiKey
      : 'invalid-api-key'
  }
  async function getToken() {
    return getTokenFn()
  }

  let $client
  const recreateClient = () => {
    const cache = offlineExchange({
      schema,
      storage,
      ...offlineSupport
    })
    const startingExchanges = process.env.DEBUGGER
      ? [devtoolsExchange, dedupExchange, debugExchange]
      : [dedupExchange]

    $client = createClient({
      url: graphqlConfig.url,
      requestPolicy: 'cache-and-network',
      exchanges: [
        ...startingExchanges,
        cache,
        fetchOptionsExchange(async fetchOptions => {
          const token = await getToken()
          const apiKey = getApiKey()
          return Promise.resolve({
            ...fetchOptions,
            headers: {
              'x-api-key': apiKey,
              'x-naep-token': token
            }
          })
        }),
        fetchExchange
      ]
    })
  }

  recreateClient()

  const client = new Proxy(
    {},
    {
      get(target, p, receiver) {
        const mapping = {
          reinitialize$: recreateClient,
          graphqlConfig
        }

        if (mapping[p]) {
          return mapping[p]
        } else {
          return $client[p]
        }
      }
    }
  )

  return client
}
