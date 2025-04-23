export default async function subscribeable(...input) {
  let queries = await Promise.all([...input])
  return () => {
    queries.forEach(qry => {
      qry.unsubscribe()
    })
    queries = []
  }
}
