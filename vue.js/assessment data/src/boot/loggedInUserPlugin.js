import { loggedInUserFactory } from 'src/naep-lib/user-vsf'
import dataProviderFactory from 'src/naep-lib/userDataProvider'

export default async ({ app, router, Vue }) => {
  const LoggedInUserPlugin = {}
  LoggedInUserPlugin.install = function (Vue, options) {
    const loggedInUser = loggedInUserFactory(
      Vue.prototype.$naepStorage,
      dataProviderFactory(() => Vue.prototype.$naepDataSource)
    )
    Vue.prototype.$loggedInUser = loggedInUser
    app.$loggedInUser = loggedInUser
  }

  Vue.use(LoggedInUserPlugin)
}
