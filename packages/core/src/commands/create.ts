import path from 'path'
import inquirer from 'inquirer'
import { globbySync } from 'globby'
import fsExtra from 'fs-extra'
import InquirerSearchList from 'inquirer-search-list'
import Listr, { ListrTask } from 'listr'
import type { PackageResponse } from '@pnpm/package-store'
import isOffline from 'is-offline-node'

import { isMonorepo } from '../utils'
import logger, { debug } from '../utils/logger'
import { CommonOptions, AsyncReturnType, Package } from '../interface'
import createStore from '../store'
import { usage } from '../utils/show-usage'
import { findPrefPackageByPk } from '../utils/find-pref-package'

type CreateOptions = Pick<Package, 'name' | 'pref'> & {
  version?: Package['version']
  alias?: string
  project: string
  store: AsyncReturnType<typeof createStore>
  latest?: boolean
  isMono?: boolean
}

/**
 * @description generate template files
 * @todo move tpl parts to @aiou/workflows
 */
const generate = async ({
  project,
  alias,
  templateResponse,
  store,
}: Omit<CreateOptions, 'name' | 'pref'> & {
  templateResponse: PackageResponse
}) => {
  await store.pm.import(project, await templateResponse.files?.())
  // generate config files from dest.template folder
  const tplPath = path.join(process.cwd(), project, 'template')
  const tpls = globbySync('*.tpl', {
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
  debug.create('create project %s from source template %s', project, alias)
}

/**
 * @description del files after generate
 * @todo move to @aiou/workflows
 */
const postgenerate = async ({
  project,
  isMono = false,
}: Pick<CreateOptions, 'project' | 'isMono'>) => {
  const common = ['CHANGELOG.md']
  const mono = ['.eslintignore', '.eslintrc', '.changeset', '.github', '.husky']
  if ((await isMonorepo()) || isMono) {
    common.concat(mono).forEach((filename) => {
      debug.create('clean up %s', path.join(process.cwd(), project, filename))
      fsExtra.removeSync(path.join(process.cwd(), project, filename))
    })
    return
  }
  common.forEach((filename) => {
    fsExtra.removeSync(path.join(process.cwd(), project, filename))
  })
}

const createTask = ({
  alias,
  project,
  store,
  latest,
  name,
  pref,
  isMono,
  version,
}: CreateOptions) => {
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
      task: async (ctx, task) => {
        const offline = await isOffline()
        if (offline) {
          debug.create('offline')
          task.skip('Ops, is offline, try create project from local store')
        } else {
          if (!latest && version) {
            debug.create('download from local')
            task.output = 'Create project from local store'
          } else {
            task.output = 'Fetching template...'
          }
        }
        ctx.templateResponse = await store.addTemplate({
          alias,
          version: latest ? undefined : version,
          latest,
          name,
          pref,
        })
      },
    },
    generate: {
      title: 'Generate project',
      task: async (ctx) => {
        if (!ctx.templateResponse) {
          throw new Error('template not found')
        }
        return generate({ project, store, templateResponse: ctx.templateResponse, alias })
      },
    },
    // postgenerate
    postgenerate: {
      title: 'Clean up',
      task: async () => {
        return postgenerate({ project, isMono })
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
  options: CommonOptions &
    Pick<CreateOptions, 'latest'> & {
      preset: string[]
      mono?: boolean
    },
) => {
  const store = await createStore(options)
  const choices = await store.lockFile.readTemplates({ presetNames: options.preset })
  if (template && project) {
    const pkg = findPrefPackageByPk(choices, { input: template })
    const task = createTask({
      alias: pkg?.alias,
      project,
      store,
      latest: options.latest,
      name: pkg?._name || template,
      isMono: options.mono,
      version: pkg?.version,
      pref: pkg.pref!,
    })
    await task.run()
    console.log()
    logger.success(`  🎉 ${project} created, Happy hacking!`)
  } else {
    if (choices.length === 0) {
      logger.log('No templates found, use follow commands load remote template or preset first')
      console.log(usage.add())
      return
    }
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
        const pkg = findPrefPackageByPk(choices, { input: answers.template })
        const task = createTask({
          alias: pkg.alias!,
          project: answers.project,
          store,
          latest: options.latest,
          name: pkg._name || pkg.name!,
          isMono: options.mono,
          version: pkg?.version,
          pref: pkg.pref!,
        })
        await task.run()
        console.log()
        logger.success(`  🎉 ${answers.project} created, Happy hacking!`)
      })
      .catch(logger.fatal)
  }
}
