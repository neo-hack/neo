const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const chalk = require('chalk')

process.env.NODE_ENV = 'development'

const config = {
  context: path.resolve(__dirname, '../'),
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {
      '@': path.resolve(__dirname, '../', 'src')
    }
  },
  devServer: {
    port: 8080,
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader'},
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.css$/,
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
        messages: ['Running here http://localhost:8080'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
    })
  ]
}

module.exports = config
