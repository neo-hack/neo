const path = require('path')
const withStylus = require('@zeit/next-stylus')

module.exports = withStylus({
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname, '')
    config.resolve.alias['@'] = path.resolve(__dirname, 'pages')
    return config
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]_[local]_[hash:base64:5]',
  },
  env: {
    IS_MOCK: true,
  },
})
