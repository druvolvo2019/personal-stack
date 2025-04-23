import * as allQueries from 'src/graphql/queries'
import * as allMutations from 'src/graphql/mutations'

export function dataSourcesFactory(naepAuth) {
  function errorHandler(callback) {
    return result => {
      if (result.error) {
        naepAuth.errorPublish(result)
      } else {
        callback(result)
      }
    }
  }

  function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  function createRun(result, name, source) {
    const execName = `run${capitalize(name)}`
    result[execName] = function(variables, callback) {
      if (typeof callback !== 'function') {
        console.error({ name: execName, variables, callback })
        throw new Error('callback needs to be a function!')
      }
      const usableQuery = naepAuth.useQuery(
        source[name],
        errorHandler(callback)
      )
      const preparedQuery = usableQuery.prepare(variables)
      const action = createRefreshTokenAndThenRunAnyActions(preparedQuery)
      return action()
    }
    result[execName].metadata = {
      kind: 'query'
    }
  }
  function createUse(result, name, source) {
    const execName = `use${capitalize(name)}`
    result[execName] = function(callback) {
      if (typeof callback !== 'function') {
        console.error({ name: execName, callback })
        throw new Error('callback needs to be a function!')
      }
      return naepAuth.useQuery(source[name], errorHandler(callback))
    }
    result[execName].metadata = {
      kind: 'useQuery'
    }
  }
  function populateQueries(source) {
    const result = {}
    Object.keys(source).forEach(name => {
      createRun(result, name, source)
      createUse(result, name, source)
    })
    return result
  }
  function populateMutations(source) {
    const result = {}
    Object.keys(source).forEach(name => {
      const execName = `run${capitalize(name)}`
      result[execName] = function(args, context = {}) {
        const usableMutation = naepAuth.useMutation(
          source[name],
          errorHandler(() => null)
        )
        const preparedMutation = usableMutation.prepare(args, context)
        const action = naepAuth.createRefreshTokenAndThenRunAnyActions(
          preparedMutation
        )
        return action()
      }
      result[execName].metadata = {
        kind: 'mutation'
      }
    })
    return result
  }
  const queries = populateQueries(allQueries)
  const mutations = populateMutations(allMutations)
  const createRefreshTokenAndThenRunAnyActions =
    naepAuth.createRefreshTokenAndThenRunAnyActions
  createRefreshTokenAndThenRunAnyActions.metadata = {
    kind: 'wrapper'
  }
  return {
    createRefreshTokenAndThenRunAnyActions,
    ...queries,
    ...mutations
  }
}
