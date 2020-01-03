const dotenv = require('dotenv')
const path = require('path')

const pkg = require('../package.json')
const { getOsEnv, normalizePort } = require('./lib/EnvUtils')

/**
 * Load .env file or .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`
  )
})

/**
 * Environment variables
 */
module.exports = {
  env: {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
      name: getOsEnv('APP_NAME'),
      version: pkg.version,
      description: pkg.description,
      host: getOsEnv('APP_HOST'),
      port: normalizePort(process.env.PORT || getOsEnv('APP_PORT'))
    }
  }
}
