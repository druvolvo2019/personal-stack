import { boot } from 'quasar/wrappers'
import Vue from 'vue'
import AWSAppSyncClient from 'aws-appsync'
import VueApollo from 'vue-apollo'

var client = null
var runQuery = null
var apolloProvider = null

export default boot(({ app }) => {
  const stage = process.env.STAGE

  const awsconfig = process.env.AWS_CONFIG

  console.log('awsconfig=', awsconfig)

  var config = {
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
      type: awsconfig.aws_appsync_authenticationType,
      apiKey: awsconfig.aws_appsync_apiKey,
    },
  }

  const options = {
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  }

  console.log('stage', stage)
  console.log(config)

  client = new AWSAppSyncClient(config, options)

  apolloProvider = new VueApollo({ defaultClient: client })

  Vue.use(VueApollo)

  async function queryHandler(query, refetchCallback) {
    if (query.success) {
      return new Promise((resolve, reject) => {
        if (query.body) {
          resolve(query.body)
        } else if (query.data) {
          resolve(query.data)
        } else {
          resolve(query)
        }
      })
    } else {
      if (query.status === 401) {
        return refetchCallback()
      } else {
        console.log('not a 401 status', query)
        return new Promise((resolve, reject) => {
          resolve([])
        })
      }
    }
  }

  runQuery = async (aquery, opname = undefined, refreshPass = false) => {
    if (!opname) {
      opname = aquery.query.definitions[0].name.value
    }
    let res = await client.query(aquery)
    let data = await res.data[opname]
    let result = await queryHandler(data, async () => {
      if (refreshPass) {
        throw new Error('Refresh token rejected')
      } else {
        return await runQuery(aquery, opname, true)
      }
    })
    return result
  }
})

export { runQuery, client, apolloProvider }
