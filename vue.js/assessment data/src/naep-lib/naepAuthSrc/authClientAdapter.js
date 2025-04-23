export default function (axiosClient, publisher) {
  /**
/request failed|failed to fetch|network\s?error/i.test(
      error.networkError.message
    ))

*/
  const errorHandler = (e) => {
    console.error(e)
    const isOfflineReport = e.message.match(
      /request failed|failed to fetch|network\s?error/i
    )
    if (isOfflineReport) {
      publisher('info:offline')
      return {
        offline: true,
      }
    } else {
      throw e
    }
  }
  async function query(...args) {
    try {
      const result = await axiosClient.query(...args)
      publisher('info:online')
      return result
    } catch (e) {
      return errorHandler(e)
    }
  }

  async function mutate(...args) {
    try {
      const result = await axiosClient.mutate(...args)
      console.log({ result })
      publisher('info:online')
      return result
    } catch (e) {
      return errorHandler(e)
    }
  }

  return {
    query,
    mutate,
  }
}
