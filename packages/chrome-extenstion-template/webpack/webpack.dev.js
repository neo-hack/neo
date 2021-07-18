const { merge } = require('webpack-merge')
const ThreadLoader = require('thread-loader')
const common = require('./webpack.common.js')
const configs = require('./configs')

ThreadLoader.warmup(configs.workerpool, ['ts-loader', 'babel-loader'])

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
})
