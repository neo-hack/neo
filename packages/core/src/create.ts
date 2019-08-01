// refs: https://github.com/vuejs/vue-cli/blob/v2/bin/vue-init
import ora from 'ora'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { exec, ExecException } from 'child_process'
import { sync as rm } from 'rimraf'
import { existsSync, renameSync } from 'fs'

import logger from './utils/logger'
import { templates, TEMPLATES, REPO_AUTHOR, REPO_NAME, PACKAGES_FOLDER } from './utils/constants'

const program = require('commander')

/**
 * Usage.
 */

program.usage('<template-name> [project-name]')

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
 * Help.
 */

const help = () => {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
  return
}
help()

/**
 * Padding.
 */

console.log()
process.on('exit', () => {
  console.log()
})

let template = program.args[0]
let projName = program.args[1]

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

const validateTemplates = (template: string) => {
  if (!template) {
    return
  }
  return Object.keys(templates).findIndex(v => v === template) > -1
}

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

export default downloadAndGenerate