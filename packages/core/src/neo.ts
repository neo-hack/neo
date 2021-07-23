#!/usr/bin/env node
import { program } from 'commander'

import { create } from './create'
import { list } from './list'
import { whoami } from './whoami'
import { readPackageUpSync } from 'read-pkg-up'

const cli = program.version(readPackageUpSync()?.packageJson?.version || '')

cli
  .command('create <template-name> [project-name]')
  .description('generate a new project from a neo template')
  .alias('c')
  .action(create)

cli.command('list').description('list all templates').alias('l').action(list)

cli.command('whoami').alias('me').description('who is neo?').action(whoami)

program.parse(process.argv)
