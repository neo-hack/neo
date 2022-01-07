import { program } from 'commander'
// import updateNotifier from 'update-notifier'
import tl from 'terminal-link'
import consola from 'consola'
import Observable from 'zen-observable';
import register from 'any-observable/register'

import { readPkg } from './utils'
import { getBanner } from './utils/show-brand'

global.Observable = Observable;
register('global.Observable')

const pkg = readPkg()
// const notifier = updateNotifier({
//   pkg: { name: pkg!.name, version: pkg!.version },
// })

const cli = program
  .version(pkg?.version || '', '-v, --version')
  .hook('preAction', () => {
    // notifier.notify()
  })
  .addHelpText('beforeAll', () => `${getBanner()}\n`)

const commands = {
  create: async () => await import('./commands/create').then((res) => res.create),
  list: async () => await import('./commands/list').then((res) => res.list),
  add: async () => await import('./commands/add').then((res) => res.add),
  prepack: async () => await import('./commands/prepack').then((res) => res.prepack),
  whoami: async () => await import('./commands/whoami').then((res) => res.whoami),
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
  .option('--store-dir [storeDir]', 'Set store dir')
  .option('-ps, --preset [presets...]', 'List templates filtered by presets')
  .option('--no-interactive', 'List configs without interactive', false)
  .action(handler('list'))

cli.command('whoami').alias('docs').description('What is neo?').action(handler('whoami'))

cli
  .command('prepack')
  .alias('p')
  .description('Prepack neo ci, lint, husky, etc.. to your project')
  .option('-m, --module [modules...]', 'Prepack partial of ci, lint, husky, etc... to your project')
  .action(handler('prepack'))

cli
  .command('add [alias]')
  .usage('neo add package')
  .description('Load template or preset into the `.neo-store`')
  .option('--store-dir [storeDir]', 'Set store dir')
  .option('--preset', 'If true, load `alias` as preset')
  .action(handler('add'))

program.parse(process.argv)

consola.wrapConsole()
process.on('unhandledRejection', (err) => consola.error('[unhandledRejection]', err))
process.on('uncaughtException', (err) => consola.error('[uncaughtException]', err))
