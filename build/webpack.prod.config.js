const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
  context: path.resolve(__dirname, '../'),
  devtool: 'source-map',
  mode: 'production',
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join('static', 'js/[id].[chunkhash].js'),
    publicPath: './',
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: function (module) {
            return (
              module.resource &&
              /\.js$/.test(module.resource)
            )
          },
          chunks: 'all',
          name: 'vendors',
          priority: -10,
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        reactVendor: {
          test: function (module) {
            return (
              module.resource &&
              /react/.test(module.resource)
            )
          },
          name: 'reactVendor',
          chunks: 'all',
          priority: 10
        },
        async: {
          chunks: 'async',
          name: 'async',
          minChunks: 2,
        }
      }
    },
    runtimeChunk: {
      name: 'mainfest'
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        extractComments: false,
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
      })
    ]
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
          { loader: MiniCSSExtractPlugin.loader, options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ]
      },
      {
        test: /(\.styl$|\.stylus$)/,
        use: [
          { loader: MiniCSSExtractPlugin.loader, options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'stylus-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, '../dist')], { root: path.join(__dirname, '../') }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
    new MiniCSSExtractPlugin({
      filename: path.posix.join('static', 'css/[name].[contenthasn].css'),
      chunkFilename: path.posix.join('static', 'css/[id].[contenthash].css'),
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
    }),
  ]
}

module.exports = config
