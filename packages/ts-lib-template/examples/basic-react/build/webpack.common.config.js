const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpakcPlugin = require('copy-webpack-plugin')
const ThreadLoader = require('thread-loader')

const webpackConfig = require('./config')

ThreadLoader.warmup(webpackConfig.common.workerPool, ['ts-loader', 'babel-loader'])

const config = {
  context: webpackConfig.common.rootPath,
  entry: ['./src/index.tsx'],
  output: {
    path: webpackConfig.common.distPath,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: webpackConfig.common.alias,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: webpackConfig.common.workerPool,
          },
          {
            loader: 'ts-loader',
            options: webpackConfig.common.tsLoaderOptions,
          },
          { loader: 'babel-loader' },
          {
            loader: 'webpack-loader-template',
            options: {},
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpakcPlugin([
      {
        from: path.resolve(__dirname, '../', 'static'),
        to: webpackConfig.common.staticFolder,
      },
    ]),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: webpackConfig.common.tsConfigPath,
      checkSyntacticErrors: true,
    }),
  ],
}

module.exports = config
