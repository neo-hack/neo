const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpakcPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const threads = os.cpus().length / 2

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
          { loader: 'babel-loader'},
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: `happypack/loader?id=ts`
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CopyWebpakcPlugin([
      {
        from: path.resolve(__dirname, '../', 'static'),
        to: webpackConfig.staticFolder,
      }
    ]),
    new HappyPack({
      id: 'ts',
      threads: threads,
      use: [
        {
          path: 'ts-loader',
          query: {
            happyPackMode: true,
            configFile: webpackConfig.tsConfigPath,
          }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: webpackConfig.tsConfigPath,
    }),
  ]
}

module.exports = config
