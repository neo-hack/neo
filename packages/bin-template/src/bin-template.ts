import * as program from 'commander'

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .command('hello', 'bin-template hello <template-name> [project-name]')

program.parse(process.argv)
