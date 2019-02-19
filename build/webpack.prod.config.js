const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MergeWebpack = require('webpack-merge')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const configs = require('./config').prod
const baseWebpackConfig = require('./webpack.common.config')

process.env.NODE_ENV = configs.mode

const prodWebpackConfig = {
  devtool: 'source-map',
  mode: configs.mode,
  output: {
    path: configs.distPath,
    filename: path.posix.join(configs.staticFolder, 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join(configs.staticFolder, 'js/[id].[chunkhash].js'),
    publicPath: configs.publicPath,
  },
  optimization: {
    splitChunks: {
      maxSize: 244000,
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
            warnings: false,
            drop_console: true,
          }
        },
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          discardComments: { removeAll: true },
        }
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCSSExtractPlugin.loader, options: { sourceMap: true } },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ]
      },
      {
        test: /(\.styl$|\.stylus$)/,
        use: [
          { loader: MiniCSSExtractPlugin.loader, options: { sourceMap: true } },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'stylus-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ configs.distPath ], { root: configs.rootPath }),
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
      filename: path.posix.join(configs.staticFolder, 'css/[name].[contenthash].css'),
      chunkFilename: path.posix.join(configs.staticFolder, 'css/[id].[contenthash].css'),
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
    }),
  ]
}

module.exports = MergeWebpack(baseWebpackConfig, prodWebpackConfig)
