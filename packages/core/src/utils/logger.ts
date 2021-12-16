import { format } from 'util'
import chalk from 'chalk'
import debug from 'debug'

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
const log = (...args: [any, ...any[]]) => {
  const msg = format.apply(format, args)
  console.log(chalk.cyan(msg))
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

const fatal = (...args: [any, ...any[]]) => {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

const success = (...args: [any, ...any[]]) => {
  const msg = format.apply(format, args)
  console.log(msg)
}

export const debugLogger = {
  lockfile: debug('neo:lockfile'),
  pm: debug('neo:pm'),
  store: debug('neo:store'),
  add: debug('neo:cmd:add'),
  create: debug('neo:cmd:create'),
}

export default {
  log,
  fatal,
  success,
}
