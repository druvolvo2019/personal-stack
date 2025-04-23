import axios from 'axios'

export default function axiosGraphQLFactory(config) {
  async function query(signInGql) {
    const result = await axios({
      method: 'POST',
      url: config.url,
      data: JSON.stringify(signInGql),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    })

    return result.data.data
  }

  async function mutate(mutationIn) {
    const { mutation, ...rest } = mutationIn
    const adjustedMutation = {
      query: mutation,
      ...rest,
    }
    const data = JSON.stringify(adjustedMutation)
    const result = await axios({
      method: 'POST',
      url: config.url,
      data,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    })

    return result.data.data
  }

  return {
    query,
    mutate,
  }
}
