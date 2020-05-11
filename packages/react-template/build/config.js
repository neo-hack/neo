// NOTE: dont move this file
const path = require('path')
const Rupture = require('rupture')

var common = {
  staticFolder: 'static',
  alias: {
    '@': path.resolve(__dirname, '../', 'src'),
    assets: path.resolve(__dirname, '../', 'src/assets'),
    static: path.resolve(__dirname, '../', 'static')
  },
  distPath: path.resolve(__dirname, '../', 'dist'),
  rootPath: path.resolve(__dirname, '../'),
  tsConfigPath: path.resolve(__dirname, '../', 'tsconfig.json'),
  // refs: https://github.com/webpack-contrib/thread-loader/blob/master/example/webpack.config.js
  workerPool: {
    workers: require('os').cpus().length - 1,
    poolTimeout: process.env.NODE_ENV === 'development' ? Infinity : 2000,
  },
  tsLoaderOptions: {
    // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
    transpileOnly: true,
    happyPackMode: true,
  },
  stylusPlugins: [Rupture()],
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
    gzip: false,
  },
}
