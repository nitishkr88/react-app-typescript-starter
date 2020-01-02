const chalk = require('chalk')
const ip = require('ip')

const divider = chalk.gray('\n-----------------------------------')

/**
 * Logger middleware
 */
const logger = {
  // called whenever there is an error on the server we want to print
  error: err => {
    console.err(chalk.red(err))
  },

  appStarted: (port, host) => {
    console.log(`Server started ! ${chalk.green('✓')}`)

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) + ''}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)
  }
}

module.exports = logger
