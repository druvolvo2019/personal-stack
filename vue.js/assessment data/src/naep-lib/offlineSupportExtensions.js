const getUserdata = (args, info) => {
  const result = {}
  Object.keys(info.variables).forEach(x => {
    if (typeof args[x] === 'undefined') {
      result[x] = info.variables[x]
    }
  })
  return result
}

export function mutationAdapter(updater) {
  return function(result, args, cache, info) {
    if (info.optimistic) {
      const userdata = getUserdata(args, info)
      return updater(result, args, cache, info, userdata)
    }
  }
}

export function offlineSupportExtensions(offlineSupport) {
  const allMutations = Object.keys(offlineSupport.updates.Mutation)
  const result = Object.assign({}, offlineSupport)
  allMutations.forEach(mut => {
    result.updates.Mutation[mut] = mutationAdapter(
      offlineSupport.updates.Mutation[mut]
    )
  })

  const allOptimistic = Object.keys(offlineSupport.optimistic)
  allOptimistic.forEach(optimisticResult => {
    const oldOptimisticResult = offlineSupport.optimistic[optimisticResult]
    result.optimistic[optimisticResult] = (variables, cache, info) => {
      const userdata = getUserdata(variables, info)
      return oldOptimisticResult(variables, cache, info, userdata)
    }
  })
  return result
}
