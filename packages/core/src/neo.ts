#!/usr/bin/env node
import { program } from 'commander'
import updateNotifier from 'update-notifier'
import { readPackageUpSync } from 'read-pkg-up'

import { r } from './utils'
import { create } from './create'
import { list } from './list'
import { whoami } from './whoami'
import { prepack } from './prepack'
import { add } from './add'

const pkg = readPackageUpSync({ cwd: r() })?.packageJson
const notifier = updateNotifier({
  pkg: { name: pkg!.name, version: pkg!.version },
})
notifier.notify()

const cli = program.version(pkg?.version || '')

cli
  .command('create [template-name] [project-name]')
  .description('Generate a new project from a neo template')
  .alias('c')
  .option('--store-dir [storeDir]', 'Set store dir')
  .action(create)

cli
  .command('list')
  .description('List all templates')
  .alias('l')
  .option('--store-dir [storeDir]', 'Set store dir')
  .action(list)

cli.command('whoami').alias('me').description('Who is neo?').action(whoami)

cli
  .command('prepack')
  .alias('p')
  .description('Prepack neo ci, lint, husky, etc.. to your project')
  .option('-m, --module [modules...]', 'Prepack partial of ci, lint, husky, etc... to your project')
  .action(prepack)

cli
  .command('add [alias]')
  .description('Load template or preset into the `.neo-store`')
  .option('--store-dir [storeDir]', 'Set store dir')
  .option('--preset', 'If true, load `alias` as preset')
  .action((alias, options = {}) => {
    return add({ alias, options })
  })

program.parse(process.argv)
