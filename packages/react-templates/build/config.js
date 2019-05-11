// NOTE: dont move this file
const path = require('path')

var common = {
  staticFolder: 'static',
  alias: {
    '@': path.resolve(__dirname, '../', 'src'),
    assets: path.resolve(__dirname, '../', 'src/assets'),
    static: path.resolve(__dirname, '../', 'static'),
  },
  distPath: path.resolve(__dirname, '../', 'dist'),
  rootPath: path.resolve(__dirname, '../'),
  tsConfigPath: path.resolve(__dirname, '../', 'tsconfig.json'),
}

module.exports = {
  common,
  dev: {
    ...common,
    mode: 'development',
    publicPath: '/',
    cssSourceMap: true,
    port: 8080,
  },
  prod: {
    ...common,
    mode: 'production',
    publicPath: './',
    cssSourceMap: true,
  },
}
