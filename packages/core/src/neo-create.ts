// refs: https://github.com/vuejs/vue-cli/blob/v2/bin/vue-init

import * as ora from 'ora'
import * as program from 'commander'
import * as inquirer from 'inquirer'
import * as path from 'path'
import * as download from 'download'
import { exec } from 'child_process'
import { existsSync } from 'fs'

import logger from './utils/logger'
import { templates, TEMPLATES, SCOPE } from './utils/constants'

const rm = require('rimraf').sync
const fsExtra = require('fs-extra')

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

const donwloadNPM = ({ template }: { template: string }): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    exec(`npm v @${SCOPE}/${template} dist.tarball`, (err, stdout) => {
      if (err) {
        console.log()
        logger.fatal('Failed to download template ' + template + ': ' + err.message.trim())
        return reject(err)
      }
      download(stdout, path.join(process.cwd(), '.neo'), {
        extract: true,
      }).then(() => {
        return resolve(true)
      })
    })
  })
}

const downloadAndGenerate = ({ template, dest }: { template: string; dest: string }) => {
  if (existsSync(template)) rm(template)
  const spinner = ora('downloading template')
  spinner.start()
  donwloadNPM({ template })
    .then(() => {
      fsExtra
        .copy(path.join(process.cwd(), '.neo/package'), path.join(process.cwd(), dest))
        .then(() => {
          fsExtra.remove(path.join(process.cwd(), '.neo'))
          spinner.stop()
          logger.success(`🎉 ${template} Generated 🎉!`)
        })
    })
    .catch(err => {
      spinner.stop()
      logger.fatal('Failed to download template ' + template + ': ' + err.message.trim())
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
        type: 'list',
        name: 'template',
        message: 'Please pick a template',
        choices: Object.keys(templates).map(k => {
          return {
            name: k,
          }
        }),
        default: 'react-template',
        validate: function(answer) {
          if (!answer) {
            return 'You must choose at least one template.'
          }
          return true
        },
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
