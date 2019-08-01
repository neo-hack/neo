'use strict'

var program = require('commander')
program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .command('create', 'generate a new project from a neo template')
  .command('list', 'list all templates')
program.parse(process.argv)
