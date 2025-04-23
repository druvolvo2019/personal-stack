import { recreateableClient } from './urql-client-factories/recreateable-client'

export function createUrqlClient(
  offlineSupport,
  urqlStorage,
  graphqlConfig,
  getTokenFn,
  loggedInUser
) {
  const client = recreateableClient(
    offlineSupport,
    graphqlConfig,
    urqlStorage,
    getTokenFn,
    loggedInUser
  )

  return { client, urqlStorage }
}
