/*

Instructions:

- You will need to create an entry in hosts for vsf.dev mapping to 127.0.0.1
- The certificates are sent separately. They should be extracted into a folder called certificates



*/

const fs = require('fs')

const hasCerts = fs.existsSync('certificates/vsf.dev-key.pem')
const localHttps = hasCerts
  ? {
      https: {
        key: fs.readFileSync('certificates/vsf.dev-key.pem'),
        cert: fs.readFileSync('certificates/vsf.dev.pem'),
        ca: fs.readFileSync('certificates/rootCA.pem'),
      },
      port: 8083,
      host: 'vsf.dev',
    }
  : {
      https: false,
      port: 8080,
    }

module.exports = localHttps
