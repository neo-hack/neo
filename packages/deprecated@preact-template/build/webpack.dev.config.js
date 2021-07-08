const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MergeWebpack = require('webpack-merge')
const webpack = require('webpack')

const configs = require('./config').dev
const commonWebpackConfig = require('./webpack.common.config')

/**
 * @type import('webpack').Configuration
 */
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
    open: false,
    overlay: true,
    compress: true,
    clientLogLevel: 'none',
    quiet: true,
    proxy: {
      '/api': {
        target: `http://localhost:8081`,
        pathRewrite: {
          '^api/': '',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]___[hash:base64:5]',
              namedExport: true,
              silent: true,
            },
          },
        ],
      },
      {
        test: /(\.styl$|\.stylus$)/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]___[hash:base64:5]',
              namedExport: true,
              silent: true,
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              use: configs.stylusPlugins,
            },
          },
        ],
      },
    ],
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
        notes: ['Happy coding'],
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
    }),
  ],
}

module.exports = MergeWebpack(commonWebpackConfig, devWebpackConfig)
