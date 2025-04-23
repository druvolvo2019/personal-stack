import { getWithExpiry, getWithExpirySession } from 'src/lib/auth-expiration'

function beforeEachDev(to, from, next, loggedIn) {
  if (to.path.match(/sandbox/i)) {
    next()
  } else {
    beforeEachProd(to, from, next, loggedIn)
  }
}

function beforeEachProd(to, from, next, loggedIn) {
  if (!loggedIn && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
}

export default ({ router }) => {
  const beforeEachBody =
    process.env.NODE_ENV === 'development' ? beforeEachDev : beforeEachProd
  router.beforeEach((to, from, next) => {
    let loggedIn = getWithExpiry('loggedIn')

    if (Object.is(loggedIn, null)) {
      loggedIn = true
    }

    beforeEachBody(to, from, next, loggedIn)
  })
}
