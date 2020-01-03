const express = require('express')
const { resolve } = require('path')

const logger = require('./logger')
const { env } = require('./env')
const setup = require('./middlewares/frontendMiddleware')

const isDev = process.env.NODE_ENV !== 'production'

const app = express()

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi)

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'dist'),
  publicPath: '/'
})

// get the intended host and port number, use localhost and port 3000 if not provided
const host = env.app.host || 'localhost'
const port = env.app.port || 3000

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  next()
})

// start the app
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message)
  }

  logger.appStarted(port, host)
})
