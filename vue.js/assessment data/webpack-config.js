const path = require('path')

module.exports = cfg => {
  cfg.module.rules.push({
    enforce: 'pre',
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    options: {
      formatter: require('eslint').CLIEngine.getFormatter('stylish'),
      fix: true
    }
  })
  cfg.module.rules.push({
    test: /\.vue$/,
    loader: 'vue-docgen-loader',
    enforce: 'post'
  })

  cfg.resolve.alias = {
    ...cfg.resolve.alias,
    src: path.resolve(__dirname, './src')
  }
  return cfg
}
