const fs = require('fs')

const filename = 'public/version.json'

const version = fs.existsSync(filename)
  ? JSON.parse(fs.readFileSync(filename))
  : {
      major: 0,
      minor: 0,
      build: 0,
    }

const [app, path, buildNumber] = process.argv

version.build = parseInt(buildNumber)

fs.writeFileSync(filename, JSON.stringify(version))
console.log(version)
