import path from 'path'
import inquirer from 'inquirer'
import globby from 'globby'
import fsExtra from 'fs-extra'
import InquirerSearchList from 'inquirer-search-list'
import Listr, { ListrTask } from 'listr'
import type { PackageResponse } from '@pnpm/package-store'
import uniqby from 'lodash.uniqby'
import countby from 'lodash.countby'

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
          throw new Error(`<project> is required`)
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
export const create = async (
  template: string,
  project: string,
  options: CommonOptions & {
    preset: string[]
  },
) => {
  const store = await createStore(options)
  let choices = uniqby(await store.lockFile.readTemplates({ presetNames: options.preset }), 'pref')
  if (template && project) {
    const pref = choices.find((choice) => choice.name === template)
    const task = createTask({ template: pref?.pref || template, project, store })
    await task.run()
    console.log()
    logger.success(`🎉 ${template} generated, Happy hacking!`)
  } else {
    const counters = countby(choices, 'name')
    choices = choices.map((ch) => ({
      ...ch,
      name: counters[ch.name!] > 1 && ch.pref ? `${ch.name} (${ch.pref})` : ch.name,
    }))
    inquirer
      .prompt<{ template: string; project: string }>([
        {
          type: 'search-list',
          name: 'template',
          message: 'Please select template',
          choices,
          validate(answer: { template: string; project: string }) {
            if (!answer) return 'You must choose template.'

            return true
          },
        },
        {
          type: 'input',
          name: 'project',
          message: 'Please enter project name',
          validate(answer: { template: string; project: string }) {
            if (!answer) return 'You must enter project name.'

            return true
          },
        },
      ])
      .then(async (answers) => {
        const pref = choices.find((choice) => choice.name === answers.template)
        const task = createTask({
          template: pref?.pref || answers.template,
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
