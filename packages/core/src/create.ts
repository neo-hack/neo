import path from 'path'
import execa from 'execa'
import inquirer from 'inquirer'
import download from 'download'
import globby from 'globby'
import fsExtra from 'fs-extra'
import InquirerSearchList from 'inquirer-search-list'
import Listr, { ListrTask } from 'listr'
import { isMonorepo } from './utils'

import logger from './utils/logger'
import { CommonOptions } from './interface'
import createLockFile from './utils/lock-file'

process.on('exit', () => {
  console.log()
})

/**
 * download template .neo folder
 */
const downloadNPM = async ({ template }: { template: string }) => {
  const { stdout } = await execa('npm', ['v', template, 'dist.tarball'])
  await download(stdout, path.join(process.cwd(), '.neo'), {
    extract: true,
  })
}

/**
 * generate template files
 */
const generate = async ({ dest }: { dest: string }) => {
  await fsExtra.copy(path.join(process.cwd(), '.neo/package'), path.join(process.cwd(), dest))
  await fsExtra.remove(path.join(process.cwd(), '.neo'))
  // generate config files from dest.template folder
  const tplPath = path.join(process.cwd(), dest, 'template')
  const tpls = globby.sync('*.tpl', {
    cwd: tplPath,
    dot: true,
  })
  tpls.forEach((f) => {
    fsExtra.copySync(path.join(tplPath, f), path.join(process.cwd(), dest, f.replace('.tpl', '')))
  })
  // remove template folder
  fsExtra.removeSync(tplPath)
}

/**
 * @description del files after generate
 */
const postgenerate = async ({ dest }: { dest: string }) => {
  const common = ['CHANGELOG.md']
  const mono = ['.eslintignore', '.eslintrc', '.changeset', '.github', '.husky']
  if (await isMonorepo()) {
    common.concat(mono).forEach((filename) => {
      fsExtra.removeSync(path.join(process.cwd(), dest, filename))
    })
    return
  }
  common.forEach((filename) => {
    fsExtra.removeSync(path.join(process.cwd(), dest, filename))
  })
}

const createTask = ({ template, project }: { template: string; project: string }) => {
  const hooks = {
    validate: {
      title: 'Validate template',
      task: () => {
        if (!project) {
          throw new Error(`<project-name> is required`)
        }
      },
    },
    download: {
      title: 'Download template',
      task: async () => {
        // TODO: looks not need
        fsExtra.removeSync(template)
        await downloadNPM({ template })
      },
    },
    generate: {
      title: 'Generate project',
      task: async () => {
        return generate({ dest: project })
      },
    },
    // postgenerate
    postgenerate: {
      title: 'Clean up',
      task: async () => {
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
export const create = async (template: string, project: string, options: CommonOptions) => {
  if (template && project) {
    const task = createTask({ template, project })
    await task.run()
    console.log()
    logger.success(`🎉 ${template} generated, Happy hacking!`)
  } else {
    const choices = await createLockFile(options).readTemplates()
    inquirer
      .prompt<{ template: string; project: string }>([
        {
          type: 'search-list',
          name: 'template',
          message: 'Please pick a template',
          choices,
          default: 'react-template',
          validate(answer: { template: string; project: string }) {
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
        console.log()
        logger.success(`🎉 ${template} Generated, Happy hacking!`)
      })
      .catch(logger.fatal)
  }
}
