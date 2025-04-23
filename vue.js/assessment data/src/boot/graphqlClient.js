import { createUrqlClient } from 'src/naep-lib/urql-client'
import axiosGraphQLFactory from 'src/naep-lib/axiosGraphQL'
// import { onlineListener } from 'src/naep-lib/onlineListener'

import { offlineSupport } from 'src/naep-lib/vsf-offline-support'

const storybookVersion = {
  AppSync: {
    Default: {
      ApiUrl: '',
      Region: '',
      AuthMode: '',
      ApiKey: ''
    }
  }
}
const awsconfig = process.env.AWS_CONFIG || storybookVersion

const graphqlConfig = {
  url: awsconfig.AppSync.Default.ApiUrl,
  apiKey: awsconfig.AppSync.Default.ApiKey
}

export default async ({ app, router, Vue }) => {
  function getTokenFn() {
    return Vue.prototype.$loggedInUser.getToken()
  }
  const axiosGraphQL = axiosGraphQLFactory({
    url: graphqlConfig.url,
    apiKey: graphqlConfig.apiKey
  })

  const { client, urqlStorage } = createUrqlClient(
    offlineSupport,
    Vue.prototype.$naepStorage,
    graphqlConfig,
    getTokenFn,
    Vue.prototype.$loggedInUser
  )

  Vue.prototype.$urqlClient = client
  Vue.prototype.$authClient = axiosGraphQL
  // Vue.prototype.$onlineListener = onlineListener

  app.urqlClient = client
  app.axiosGraphQL = axiosGraphQL
}
