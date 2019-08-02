// refs: https://github.com/vuejs/vue-cli/blob/v2/bin/vue-init
import ora from 'ora'
import program from 'commander'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { exec, ExecException } from 'child_process'
import { existsSync, renameSync } from 'fs'

import logger from './utils/logger'
import { templates, TEMPLATES, REPO_AUTHOR, REPO_NAME, PACKAGES_FOLDER } from './utils/constants'

const rm = require('rimraf').sync

/**
 * Usage.
 */

program.usage('<template-name> [project-name]').option('-h, --help', 'show helpers')

/**
 * Help.
 */

program.on('--help', () => {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project with an official template'))
  console.log('    $ neo init rollup-template my-project')
  console.log()
})

/**
 * Padding.
 */

console.log()
process.on('exit', () => {
  console.log()
})

program.parse(process.argv)
let template = program.args && program.args[0]
let projName = program.args && program.args[1]

// refs https://stackoverflow.com/a/44109535/11868008
const donwload = ({ template }: { template: string }): Promise<boolean> => {
  const downloadCommand = `curl -s https://codeload.github.com/${REPO_AUTHOR}/${REPO_NAME}/tar.gz/master | \
  tar -xz --strip=2 ${REPO_NAME}-master/${PACKAGES_FOLDER}/${template}`
  return new Promise((resolve, reject) => {
    exec(downloadCommand, err => {
      if (err) {
        return reject(err)
      }
    })
    return resolve(true)
  })
}

const downloadAndGenerate = ({ template, dest }: { template: string; dest: string }) => {
  if (existsSync(template)) rm(template)
  const spinner = ora('downloading template')
  spinner.start()
  donwload({ template })
    .then(() => {
      spinner.stop()
      renameSync(template, dest)
      logger.success('Generated!')
    })
    .catch((e: ExecException) => {
      spinner.stop()
      logger.fatal('Failed to download template ' + template + ': ' + e.message.trim())
    })
}

const validateTemplates = (template: string) => {
  if (!template) {
    return
  }
  return Object.keys(templates).findIndex(v => v === template) > -1
}

const run = () => {
  // template did't exit
  if (!validateTemplates(template)) {
    logger.fatal(`Failed locate ${template}`)
    return
  }
  // project name is required
  if (!projName) {
    logger.fatal(`<project-name> is required`)
    return
  }
  downloadAndGenerate({ template, dest: projName })
}

if (template && projName) {
  run()
} else
  inquirer
    .prompt<{ template: TEMPLATES; projName: string }>([
      {
        type: 'checkbox',
        name: 'template',
        message: 'Please pick a template',
        choices: Object.keys(templates).map(k => {
          return {
            name: k,
            value: k,
            checked: k === 'react-template' ? true : false,
          }
        }),
      },
      {
        type: 'input',
        name: 'projName',
        message: 'Please enter a project name',
      },
    ])
    .then(answers => {
      template = answers.template
      projName = answers.projName
      run()
    })
    .catch(logger.fatal)
