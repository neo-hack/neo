const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpakcPlugin = require('copy-webpack-plugin')

const webpackConfig = require('./config').common

const config = {
  context: webpackConfig.rootPath,
  entry: ['./src/index.tsx'],
  output: {
    path: webpackConfig.distPath,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: webpackConfig.alias,
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
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require('os').cpus().length - 1,
              poolTimeout: Infinity, // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            },
          },
          { loader: 'babel-loader' },
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
        to: webpackConfig.staticFolder,
      },
    ]),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: webpackConfig.tsConfigPath,
      checkSyntacticErrors: true,
    }),
  ],
}

module.exports = config
