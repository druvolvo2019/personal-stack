/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra')
let extend = undefined

/**
 * The .babelrc file has been created to assist Jest for transpiling.
 * You should keep your application's babel rules in this file.
 */

if (fs.existsSync('./.babelrc')) {
  extend = './.babelrc'
}

const loose = process.argv[1].match(/storybook/i)

module.exports = {
  presets: ['@quasar/babel-preset-app'],
  plugins: [['@babel/plugin-proposal-private-property-in-object', { loose }]],
  extends: extend,
}
