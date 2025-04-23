import { REFRESH_TOKEN_EXPIRED } from './refreshToken'

import { createRequest } from 'urql'
import { pipe, subscribe, toPromise, take } from 'wonka'

export function naepUrqlAdapterFactory(
  client,
  storage,
  refreshToken,
  notifyRefreshTokenExpired,
  failureCallback = (e) => {
    throw e
  }
) {
  function initializeFlush() {
    storage.setFlushBuffersWrapper(async (flushBuffers) => {
      const cmd = {
        execute() {
          flushBuffers()
        },
        unsubscribe() {},
        doNotKeep: true,
      }
      const action = createRefreshTokenAndThenRunAnyActions(cmd)
      await action()
    })
  }
  initializeFlush()

  let $refreshFailedActions = []

  async function rerunFailedActions() {
    const current = [...$refreshFailedActions]
    $refreshFailedActions = []
    const wrappedActions = createRefreshTokenAndThenRunAnyActions(...current)

    return wrappedActions()
  }

  function getRefreshFailedActions() {
    return $refreshFailedActions || []
  }

  function createRefreshTokenAndThenRunAnyActions(...actionCallbacks) {
    const fn = async (finished) => {
      try {
        const refreshTokenResult = await refreshToken()

        if (refreshTokenResult === REFRESH_TOKEN_EXPIRED) {
          actionCallbacks
            .filter((x) => !x.doNotKeep)
            .forEach((cb) => $refreshFailedActions.push(cb))
          notifyRefreshTokenExpired()
          return {
            unsubscribe() {
              actionCallbacks.map((actionCallback) =>
                actionCallback.unsubscribe()
              )
            },
          }
        } else {
          const results = []

          for (let i = 0; i < actionCallbacks.length; i++) {
            const actionCallback = actionCallbacks[i]
            results.push(await actionCallback.execute())
          }

          // Promise.all is non-deterministic. Using a for loop instead
          // const results = await Promise.all(
          //   actionCallbacks.map((actionCallback) => {
          //     return actionCallback.execute()
          //   })
          // )
          if (finished) {
            finished()
          }
          const output = {
            unsubscribe() {
              ;(results || []).map((x) => x.unsubscribe()) // This should be completely unnecessary, but playing it safe
            },
          }

          return output
        }
      } catch (e) {
        console.error(e.message)
        return await failureCallback(e)
      }
    }
    return fn
  }

  function useQuery(query, callback, context = {}, options = {}) {
    if (typeof callback !== 'function') {
      throw new Error(
        `The callback in useQuery must be a function. Check the console for the object passed in`
      )
    }

    const result = {
      name: query.definitions[0].name.value,
      prepare(variables, specificContext) {
        let $unsubscribe = () => null
        const temp = {
          execute() {
            $unsubscribe()

            const req = createRequest(query, variables)
            const { unsubscribe } = pipe(
              client.executeQuery(req, {
                ...context,
                ...specificContext,
              }),
              subscribe((result) => {
                callback(result)
              })
            )
            $unsubscribe = () => {
              unsubscribe()
              $unsubscribe = () => null
            }
            return temp
          },
          unsubscribe() {
            $unsubscribe()
            return temp
          },
        }
        return temp
      },
    }
    return result
  }

  async function readyQuery(query, callback, variables, context = {}) {
    const qry = this.useQuery(query, callback)
    const prepared = qry.prepare(variables)
    return createRefreshTokenAndThenRunAnyActions(prepared)
  }

  function useMutation(mutation, callback, context = {}) {
    const normalizedCallback = callback || (() => null)
    const result = {
      prepare(variables = {}, specificContext = {}) {
        return {
          async execute() {
            const request = createRequest(mutation, variables)
            const result = await pipe(
              client.executeMutation(request, {
                ...context,
                ...specificContext,
              }),
              take(1),
              toPromise
            )

            normalizedCallback(result)
          },
          unsubscribe() {},
        }
      },
    }

    return result
  }

  function managePipes() {
    const $ownedSubscriptions = []
    const addSubscriber = (subscriber) => {
      $ownedSubscriptions.push(subscriber)
      return subscriber
    }

    const result = {
      useQuery(query, callback, options = {}) {
        return addSubscriber(useQuery(query, callback, options))
      },
      useSubscription(query, callback, options = {}) {
        return addSubscriber(useSubscription(query, callback, options))
      },
      useMutation(mutation, callback, options = {}) {
        return useMutation(mutation, callback, options)
      },
      disconnectAll() {
        $ownedSubscriptions.forEach((owned) => owned.disconnect)
      },
    }

    return result
  }

  return {
    managePipes,
    useMutation,
    useQuery,
    readyQuery,
    rerunFailedActions,
    createRefreshTokenAndThenRunAnyActions,
    getRefreshFailedActions,
  }
}
