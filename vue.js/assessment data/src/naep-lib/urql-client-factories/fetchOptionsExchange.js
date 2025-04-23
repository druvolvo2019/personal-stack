import { map, mergeMap, pipe, fromPromise, fromValue } from 'wonka'
import { makeOperation } from '@urql/core'

export const fetchOptionsExchange = fn => ({ forward }) => ops$ => {
  return pipe(
    ops$,
    mergeMap(operation => {
      const result = fn(operation.context.fetchOptions)
      return pipe(
        typeof result.then === 'function'
          ? fromPromise(result)
          : fromValue(result),
        map(fetchOptions => {
          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions
          })
        })
      )
    }),
    forward
  )
}
