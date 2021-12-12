import path from 'path'
import inquirer from 'inquirer'
import globby from 'globby'
import fsExtra from 'fs-extra'
import InquirerSearchList from 'inquirer-search-list'
import Listr, { ListrTask } from 'listr'
import type { PackageResponse } from '@pnpm/package-store'

import { isMonorepo } from './utils'
import logger, { debugLogger } from './utils/logger'
import { CommonOptions, AsyncReturnType } from './interface'
import createStore from './store'

type CreateOptions = {
  template: string
  project: string
  store: AsyncReturnType<typeof createStore>
}

/**
 * @description generate template files
 * @todo move tpl parts to @aiou/workflows
 */
const generate = async ({
  project,
  template,
  templateResponse,
  store,
}: CreateOptions & {
  templateResponse: PackageResponse
}) => {
  await store.pm.import(project, await templateResponse.files?.())
  // generate config files from dest.template folder
  const tplPath = path.join(process.cwd(), project, 'template')
  const tpls = globby.sync('*.tpl', {
    cwd: tplPath,
    dot: true,
  })
  tpls.forEach((f) => {
    fsExtra.outputFileSync(
      path.join(process.cwd(), project, f.replace('.tpl', '')),
      fsExtra.readFileSync(path.join(tplPath, f)).toString(),
    )
  })
  // remove template folder
  fsExtra.removeSync(tplPath)
  debugLogger.create('create project %s from source template %s', project, template)
}

/**
 * @description del files after generate
 * @todo move to @aiou/workflows
 */
const postgenerate = async ({ project }: Pick<CreateOptions, 'project'>) => {
  const common = ['CHANGELOG.md']
  const mono = ['.eslintignore', '.eslintrc', '.changeset', '.github', '.husky']
  if (await isMonorepo()) {
    common.concat(mono).forEach((filename) => {
      fsExtra.removeSync(path.join(process.cwd(), project, filename))
    })
    return
  }
  common.forEach((filename) => {
    fsExtra.removeSync(path.join(process.cwd(), project, filename))
  })
}

const createTask = ({ template, project, store }: CreateOptions) => {
  let templateResponse: PackageResponse | undefined
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
        templateResponse = await store.addTemplate({ alias: template })
      },
    },
    generate: {
      title: 'Generate project',
      task: async () => {
        if (!templateResponse) {
          throw new Error('template not found')
        }
        return generate({ project, store, templateResponse, template })
      },
    },
    // postgenerate
    postgenerate: {
      title: 'Clean up',
      task: async () => {
        return postgenerate({ project })
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
  const store = await createStore(options)
  if (template && project) {
    const task = createTask({ template, project, store })
    await task.run()
    console.log()
    logger.success(`🎉 ${template} generated, Happy hacking!`)
  } else {
    inquirer
      .prompt<{ template: string; project: string }>([
        {
          type: 'search-list',
          name: 'template',
          message: 'Please pick a template',
          choices: await store.lockFile.readTemplates(),
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
        const task = createTask({
          template: answers.template,
          project: answers.project,
          store,
        })
        await task.run()
        console.log()
        logger.success(`🎉 ${template} Generated, Happy hacking!`)
      })
      .catch(logger.fatal)
  }
}
