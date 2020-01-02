/**
 * development mode webpack configuration
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = require('./webpack.base')({
  mode: 'development',

  // add hot reloading in development
  entry: [
    require.resolve('babel-polyfill'),
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'src/app.tsx')
  ],

  // no hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  // development plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false
    })
  ],

  tsLoaders: [
    // Babel also have typescript transpiler. Uncomment this if you prefer and comment-out ts-loader
    // { loader: 'babel-loader' },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true, // fork-ts-checker-webpack-plugin is used for type checking
        logLevel: 'info'
      }
    }
  ],

  resolve: {
    alias: {
    }
  },

  // emit a source map for easier debugging
  devtool: 'eval-source-map',

  performance: {
    hints: false
  }
})
