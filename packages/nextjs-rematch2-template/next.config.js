const path = require('path')

module.exports = {
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname, '')
    config.resolve.alias['@'] = path.resolve(__dirname, 'pages')
    return config
  },
  env: {
    IS_MOCK: true,
  },
}
