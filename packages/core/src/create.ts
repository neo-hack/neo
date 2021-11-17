import path from 'path'
import { exec } from 'child_process'
import { existsSync } from 'fs'
import ora from 'ora'
import inquirer from 'inquirer'
import download from 'download'
import globby from 'globby'
import rimraf from 'rimraf'
import fsExtra from 'fs-extra'
import InquirerSearchList from 'inquirer-search-list'
import Listr, { ListrTask } from 'listr'
import { findUp } from 'find-up'

import logger from './utils/logger'
import { templates, TEMPLATES, SCOPE } from './utils/constants'

const rm = rimraf.sync

process.on('exit', () => {
  console.log()
})

const spinner = ora('downloading template')

/**
 * download template .neo folder
 */
const downloadNPM = ({ template }: { template: string }): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    exec(`npm v @${SCOPE}/${template} dist.tarball`, (err, stdout) => {
      if (err) {
        console.log()
        logger.fatal(`Failed to download template ${template}: ${err.message.trim()}`)
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

/**
 * generate template files
 */
const generate = ({ dest, template }: { dest: string; template: string }) => {
  fsExtra
    .copy(path.join(process.cwd(), '.neo/package'), path.join(process.cwd(), dest))
    .then(() => {
      // remove cache files
      fsExtra.remove(path.join(process.cwd(), '.neo'))
      return true
    })
    .then(() => {
      // generate config files from dest.template folder
      const tplPath = path.join(process.cwd(), dest, 'template')
      const tpls = globby.sync('*.tpl', {
        cwd: tplPath,
        dot: true,
      })
      tpls.forEach((f) => {
        fsExtra.copySync(
          path.join(tplPath, f),
          path.join(process.cwd(), dest, f.replace('.tpl', '')),
        )
      })
      // remove template folder
      fsExtra.removeSync(tplPath)
    })
    .then(() => {
      spinner.stop()
      logger.success(`🎉 ${template} Generated 🎉!`)
    })
}

/**
 * @description del files after generate
 */
const postgenerate = async ({ dest }: { dest: string }) => {
  const common = ['CHANGELOG.md']
  const mono = ['.eslintignore', '.eslintrc', '.changeset', '.github', '.husky']
  if (await findUp('pnpm-workspace.yaml')) {
    common.concat(mono).forEach((filename) => {
      fsExtra.removeSync(path.join(process.cwd(), dest, filename))
    })
    return
  }
  common.forEach((filename) => {
    fsExtra.removeSync(path.join(process.cwd(), dest, filename))
  })
}

const validateTemplates = (template: string) => {
  if (!template) return

  return Object.keys(templates).findIndex((v: string) => v === template) > -1
}

const createTask = ({ template, project }: { template: string; project: string }) => {
  const hooks = {
    validate: {
      title: 'Validate template',
      task: () => {
        if (!validateTemplates(template)) {
          throw new Error(`Failed locate ${template}`)
        }
        if (!project) {
          throw new Error(`<project-name> is required`)
        }
        return true
      },
    },
    download: {
      title: 'Download template',
      task: () => {
        // TODO: looks not need
        if (existsSync(template)) rm(template)
        return downloadNPM({ template })
      },
    },
    generate: {
      title: 'Generate project',
      task: () => {
        return generate({ dest: project, template })
      },
    },
    // postgenerate
    postgenerate: {
      title: 'Clean up',
      task: () => {
        return postgenerate({ dest: project })
      },
    },
  }
  return new Listr(Object.values(hooks) as ListrTask<any>[])
}

inquirer.registerPrompt('search-list', InquirerSearchList)

/**
 * @description create project from template
 */
export const create = async (template: string, project: string) => {
  const mono = await findUp('pnpm-workspace.yaml')
  if (mono) {
    console.log('mono')
  }
  if (template && project) {
    const task = createTask({ template, project })
    await task.run()
  } else {
    console.log()
    inquirer
      .prompt<{ template: TEMPLATES; project: string }>([
        {
          type: 'search-list',
          name: 'template',
          message: 'Please pick a template',
          choices: Object.keys(templates).map((k) => {
            return {
              name: k,
            }
          }),
          default: 'react-template',
          validate(answer: { template: TEMPLATES; project: string }) {
            if (!answer) return 'You must choose at least one template.'

            return true
          },
        },
        {
          type: 'input',
          name: 'project',
          message: 'Please enter a project name',
        },
      ])
      .then(async (answers) => {
        const task = createTask({ template: answers.template, project: answers.project })
        await task.run()
      })
      .catch(logger.fatal)
  }
}
