import { dataSourcesFactory } from 'src/naep-lib/data-sources'
import { Store } from 'src/store'

import naepAuthFactory from 'src/naep-lib/naepAuth'

export default async ({ app, router, Vue }) => {
  const NaepAuthPlugin = {}
  const globalStoreDispatch = action => {
    Store.dispatch(`naepAuthManager/${action}`)
  }
  const naepAuth = await naepAuthFactory(
    Vue.prototype.$urqlClient,
    Vue.prototype.$authClient,
    Vue.prototype.$naepStorage,
    Vue.prototype.$loggedInUser,
    // Vue.prototype.$onlineListener,
    globalStoreDispatch
  )

  NaepAuthPlugin.install = function(Vue, options) {
    Vue.prototype.$naepAuth = naepAuth
    Vue.prototype.$naepDataSource = dataSourcesFactory(naepAuth)
  }

  Vue.use(NaepAuthPlugin)
}
