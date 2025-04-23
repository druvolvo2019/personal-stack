import axios from 'axios'

const GenericRead = `
query genericRead($input: ReadInput!) {
  jsonRead(input: $input) {
    success
    body
  }
}`

async function doESRead(apayload) {
  const query = {
    query: GenericRead,
    operationName: 'genericRead',
    variables: {
      input: apayload,
    },
  }
  let res = await axios({
    method: 'POST',
    url:
      'https://og65cp266bh6bedvb6uen7dfsi.appsync-api.us-east-2.amazonaws.com/graphql',
    data: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'da2-upssv2ey2nb5tlpjwhkveiwhci',
    },
  })
  console.log('doESRead', res.data.data.jsonRead)
  return res.data.data.jsonRead
}

const esHistoryPayload = {
  operation: 'hist',
  param: 'dev',
}

export async function externalSurveyHistory() {
  let s = await doESRead(esHistoryPayload)
  console.log('extSurveyHistory', s)
  return s
}

function esHTMLPayload(id) {
  return { operation: 'html', param: id }
}

export async function externalHTML(id) {
  let s = await doESRead(esHTMLPayload(id))
  if (s.success) {
    let res = JSON.parse(s.body)
    return res[0].html
  } else return s.body
}
