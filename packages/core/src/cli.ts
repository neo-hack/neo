import { fileURLToPath } from 'node:url'

import { program } from 'commander'
import consola from 'consola'
import tl from 'terminal-link'

import { readPkg } from './utils'
import { HOMEPAGE } from './utils/constants'
import logger from './utils/logger'
import { getBanner } from './utils/show-brand'
import { usage } from './utils/show-usage'

// polyfill node12 & 14 global variable
global.__filename = fileURLToPath(import.meta.url)

const pkg = readPkg()

const cli = program
  .version(pkg?.version || '', '-v, --version')
  .hook('preAction', () => {
    // disable display version during vitest https://vitest.dev/config/#configuring-vitest
    !process.env.VITEST && logger.log(`${tl(`NEO v${pkg?.version}`, HOMEPAGE)}\n`)
  })
  .addHelpText('beforeAll', () => `${getBanner()}\n`)

const commands = {
  create: async () => await import('./commands/create').then(res => res.create),
  list: async () => await import('./commands/list').then(res => res.list),
  add: async () => await import('./commands/add').then(res => res.add),
  run: async () => await import('./commands/run').then(res => res.run),
  prepack: async () => await import('./commands/prepack').then(res => res.prepack),
  whoami: async () => await import('./commands/whoami').then(res => res.whoami),
}

const handler = (cmdName: string) => {
  return async function (...args: any[]) {
    try {
      const cmd = await commands[cmdName]()
      await cmd(...args)
    } catch (e) {
      consola.error(e)
    }
  }
}

cli
  .command('create [alias] [project]')
  .usage('neo create template project')
  .description('Create a new project from template')
  .alias('c')
  .option('--store-dir [storeDir]', 'Set store dir')
  .option('-ps, --preset [presets...]', 'Create templates filtered by presets')
  .option('--latest', 'Create project from remote latest template', false)
  .option(
    '-m, --mono',
    `Specify create project in monorepo, see ${tl(
      'here',
      'https://github.com/neo-hack/neo/blob/master/docs/create.md#create-in-monorepo',
    )} for more details`,
  )
  .action(handler('create'))

cli
  .command('list [configs]')
  .description('List all templates or configs')
  .alias('l')
  .alias('ls')
  .option('--store-dir [storeDir]', 'Set store dir')
  .option('-ps, --preset [presets...]', 'List templates filtered by presets')
  .option('--no-interactive', 'List configs without interactive', false)
  .action(handler('list'))

cli.command('whoami').alias('docs').description('What is neo?').action(handler('whoami'))

cli
  .command('run [generator]')
  .description(
    `Run ${tl(
      '@aiou/mario',
      'https://github.com/neo-hack/neo/tree/master/packages/mario',
    )} generator`,
  )
  .option('-m, --module [modules...]', 'Partial modules of workflow will run')
  .option('--store-dir [storeDir]', 'Set store dir')
  .action(handler('run'))
  .addHelpText('after', usage.run())

cli
  .command('prepack')
  .option('-m, --module [modules...]', 'Partial modules of workflow will run')
  .action(handler('prepack'))

cli
  .command('add [alias]')
  .usage('neo add package')
  .description('Load template or preset into the `.neo-store`')
  .option('--store-dir [storeDir]', 'Set store dir')
  .option('--preset', 'If true, load `alias` as preset')
  .action(handler('add'))
  .addHelpText('after', usage.add())

program.parse(process.argv)

consola.wrapConsole()
process.on('unhandledRejection', err => consola.error('[unhandledRejection]', err))
process.on('uncaughtException', err => consola.error('[uncaughtException]', err))
// @ts-expect-error http://nodejs.cn/api/process/process_nodeprecation.html
process.noDeprecation = true
