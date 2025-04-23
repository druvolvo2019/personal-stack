import {
  from,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'

export /* async */ function getClientOptions(/* {app, router, ...} */ options) {
  const stage = process.env.STAGE
  const awsconfig = process.env.AWS_CONFIG

  const uri =
    process.env.GRAPHQL_URI ||
    // Change to your graphql endpoint.
    awsconfig.aws_appsync_graphqlEndpoint

  const appSyncLink = createHttpLink({
    uri,
  })

  const createDevelopmentSplitLink = () => {
    const localhostLink = createHttpLink({
      uri: 'http://localhost:4091',
    })
    return ApolloLink.split(
      (operation) => {
        return operation.getContext().clientName === 'local'
      },
      localhostLink,
      appSyncLink
    )
  }

  const createProductionLink = () => {
    return appSyncLink
  }

  const additiveLink = from([
    new ApolloLink((operation, forward) => {
      operation.setContext(({ headers }) => {
        return {
          headers: {
            ...headers,
            'x-api-key': awsconfig.aws_appsync_apiKey,
          },
        }
      })
      return forward(operation)
    }),
    onError((error) => {
      logErrorMessages(error)
    }),
    process.env.NODE_ENV === 'development'
      ? createDevelopmentSplitLink()
      : createProductionLink(),
  ])
  return Object.assign(
    // General options.
    {
      link: additiveLink,
      region: awsconfig.aws_appsync_region,
      auth: {
        type: awsconfig.aws_appsync_authenticationType,
        apiKey: awsconfig.aws_appsync_apiKey,
      },
      cache: new InMemoryCache(),
    },
    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},
    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},
    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  )
}
