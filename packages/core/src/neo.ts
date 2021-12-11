#!/usr/bin/env node
import { program } from 'commander'
import updateNotifier from 'update-notifier'
import { readPackageUpSync } from 'read-pkg-up'

import { r } from './utils'
import { create } from './create'
import { list } from './list'
import { whoami } from './whoami'
import { prepack } from './prepack'
import { preset } from './preset'

const pkg = readPackageUpSync({ cwd: r() })?.packageJson
const notifier = updateNotifier({
  pkg: { name: pkg!.name, version: pkg!.version },
})
notifier.notify()

const cli = program.version(pkg?.version || '')

cli
  .command('create [template-name] [project-name]')
  .description('generate a new project from a neo template')
  .alias('c')
  .action(create)

cli.command('list').description('list all templates').alias('l').action(list)

cli.command('whoami').alias('me').description('who is neo?').action(whoami)

cli
  .command('prepack')
  .alias('p')
  .description('prepack neo ci, lint, husky, etc.. to your project')
  .option('-m, --module [modules...]', 'prepack ci, lint, husky, etc... standalone')
  .action(prepack)

cli
  .command('preset [alias]')
  .alias('ps')
  .description('load template preset module into local')
  .option('--store-dir [storeDir]', 'define store dir')
  .action((alias, options = {}) => {
    return preset({ alias, storeDir: options.storeDir })
  })

program.parse(process.argv)
