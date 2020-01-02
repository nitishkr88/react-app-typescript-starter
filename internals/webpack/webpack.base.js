/**
 * common webpack configuration
 */

const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

process.noDeprecation = true

module.exports = options => {
  const ENV = process.env.ENV || process.env.NODE_ENV
  const envPath = path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`
  )
  const fileEnv = dotenv.config({ path: envPath }).parsed

  const envkeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(
      process.env[next] || fileEnv[next]
    )
    return prev
  }, {})
  envkeys['process.env.ENV'] = JSON.stringify(process.env.ENV)

  return {
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
      {
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: '/'
      },
      options.output
    ),
    optimization: options.optimization,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: options.babelQuery
          }
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: options.tsLoaders
        },
        {
          // preprocess our own .css files
          test: /\.(le|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: 'file-loader'
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                // inline files smaller than 10 kB
                limit: 10 * 1024,
                noquotes: true
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                // inline files smaller than 10 kB
                limit: 10 * 1024
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  enabled: false
                  // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                  // Try enabling it in your environment by switching the config to:
                  // enabled: true,
                  // progressive: true,
                },
                gifsicle: {
                  interlaced: false
                },
                optipng: {
                  optimizationLevel: 7
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        }
      ]
    },
    plugins: options.plugins.concat([
      new webpack.DefinePlugin(envkeys),
      new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
    ]),
    resolve: {
      ...(options.resolve && options.resolve),
      modules: ['node_modules', 'app'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      mainFields: ['browser', 'jsnext:main', 'main']
    },
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {}
  }
}
