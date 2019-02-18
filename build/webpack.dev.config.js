const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MergeWebpack = require('webpack-merge')
const webpack = require('webpack')

const configs = require('./config').dev
const commonWebpackConfig = require('./webpack.common.config')

process.env.NODE_ENV = configs.mode

const devWebpackConfig = {
  devtool: 'cheap-module-eval-source-map',
  mode: configs.mode,
  output: {
    path: configs.distPath,
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    port: configs.port,
    contentBase: false,
    open: true,
    overlay: true,
    compress: true,
    clientLogLevel: 'none',
    quiet: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: "css-loader", options: { sourceMap: true } },
        ]
      },
      {
        test: /(\.styl$|\.stylus$)/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          { loader: 'stylus-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['Running here http://localhost:' + configs.port],
        notes: ['Happy coding']
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
    })
  ]
}

console.log(MergeWebpack(commonWebpackConfig, devWebpackConfig))
module.exports = MergeWebpack(commonWebpackConfig, devWebpackConfig)
