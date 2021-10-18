#!/usr/bin/env node
import { program } from 'commander'
import updateNotifier from 'update-notifier'
import { readPackageUpSync } from 'read-pkg-up'

import { r } from './utils'
import { create } from './create'
import { list } from './list'
import { whoami } from './whoami'
import { prepack } from './prepack'

const pkg = readPackageUpSync({ cwd: r() })?.packageJson
const notifier = updateNotifier({ pkg })
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
  .description('prepack neo ci, lint, etc.. to your project')
  .option('-m, --module [modules...]', 'prepack ci, lint, etc... standalone')
  .action(prepack)

program.parse(process.argv)
