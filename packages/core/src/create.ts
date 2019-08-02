// refs: https://github.com/vuejs/vue-cli/blob/v2/bin/vue-init
import ora from 'ora'
import program from 'commander'
import inquirer from 'inquirer'
import path from 'path'
import { exec } from 'child_process'
import { existsSync, rename, mkdir } from 'fs'

import logger from './utils/logger'
import { templates, TEMPLATES, REPO_AUTHOR, REPO_NAME, PACKAGES_FOLDER } from './utils/constants'

const rm = require('rimraf').sync

/**
 * Usage.
 */

program.usage('<template-name> [project-name]')

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
    const child = exec(downloadCommand, err => {
      if (err) {
        console.log()
        logger.fatal('Failed to download template ' + template + ': ' + err.message.trim())
        return reject(err)
      }
    })
    child.on('exit', () => {
      resolve(true)
    })
  })
}

const downloadAndGenerate = ({ template, dest }: { template: string; dest: string }) => {
  if (existsSync(template)) rm(template)
  const spinner = ora('downloading template')
  spinner.start()
  donwload({ template })
    .then(() => {
      mkdir(path.join(process.cwd(), dest), err => {
        if (err) {
          logger.fatal(`Failed create ${dest}: ${err.message.trim()}`)
          return
        }
        rename(path.join(process.cwd(), template), path.join(process.cwd(), dest), err => {
          if (err) {
            console.log()
            logger.fatal(`Failed download ${template} to ${dest}: ${err.message.trim()}`)
          }
          spinner.stop()
          logger.success(`template ${template} Generated!`)
        })
      })
    })
    .catch(() => {
      spinner.stop()
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
