export default function(args) {
  const variables = {}
  const metadata = {}
  Object.keys(args).forEach(v => {
    if (/^\$/.test(v)) {
      metadata[v.slice(1)] = args[v]
    } else {
      variables[v] = args[v]
    }
  })

  return {
    variables,
    metadata
  }
}
