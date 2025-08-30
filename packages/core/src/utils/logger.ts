import { format } from 'node:util'

import Debug from 'debug'
import pc from 'picocolors'

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
const log = (...args: [any, ...any[]]) => {
  const msg = format.apply(format, args)
  console.log(pc.cyan(msg))
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

const fatal = (...args: [any, ...any[]]) => {
  if (args[0] instanceof Error) {
    args[0] = args[0].message.trim()
  }
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

export const debug = {
  lockfile: Debug('neo:lockfile'),
  pm: Debug('neo:pm'),
  store: Debug('neo:store'),
  add: Debug('neo:cmd:add'),
  create: Debug('neo:cmd:create'),
  list: Debug('neo:cmd:list'),
  run: Debug('neo:cmd:run'),
  cleanup: Debug('neo:cmd:cleanup'),
}

export default {
  log,
  fatal,
  success,
}
