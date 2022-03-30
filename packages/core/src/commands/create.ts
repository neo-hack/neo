import path from 'path'
import inquirer from 'inquirer'
import fsExtra from 'fs-extra'
import InquirerSearchList from 'inquirer-search-list'
import Listr, { ListrTask } from 'listr'
import type { PackageResponse } from '@pnpm/package-store'
import isOffline from 'is-offline-node'
import pc from 'picocolors'
import gitconfig from 'gitconfig'
import { merge } from 'lodash-es'

import { isMonorepo, isYaml } from '../utils'
import logger, { debug } from '../utils/logger'
import { CommonOptions, AsyncReturnType, Package } from '../interface'
import createStore from '../store'
import { usage } from '../utils/show-usage'
import { findPrefPackageByPk } from '../utils/find-pref-package'
import { runMario } from '../utils/mario'
import { loadConfig } from '../utils/load-config'

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
 */
const generate = async ({
  project,
  templateResponse,
  store,
}: Omit<CreateOptions, 'name' | 'pref'> & {
  templateResponse: PackageResponse
}) => {
  await store.pm.import(project, await templateResponse.files?.())
}

/**
 * @description del files after generate
 * @todo move to @aiou/generator-aiou
 */
const postgenerate = async ({
  project,
  isMono = false,
}: Pick<CreateOptions, 'project' | 'isMono'>) => {
  const common = ['CHANGELOG.md']
  const mono = ['.eslintignore', '.eslintrc', '.eslintrc.js', '.changeset', '.github', '.husky']
  if ((await isMonorepo()) || isMono) {
    common.concat(mono).forEach((filename) => {
      debug.create('clean up %s', path.join(process.cwd(), project, filename))
      fsExtra.removeSync(path.join(process.cwd(), project, filename))
    })
    return
  }
  // issue: https://github.com/neo-hack/neo/issues/343
  if (fsExtra.existsSync(path.join(process.cwd(), project, 'package.json'))) {
    const pkg = fsExtra.readJSONSync(path.join(process.cwd(), project, 'package.json'))
    pkg.readme = undefined
    fsExtra.outputJSONSync(path.join(process.cwd(), project, 'package.json'), pkg)
  }
  // clear up
  common.forEach((filename) => {
    fsExtra.removeSync(path.join(process.cwd(), project, filename))
  })
}

/**
 * @description apply @aiou/mario based on project `.neo`
 */
const runTemplateMario = async ({ project, store }: Pick<CreateOptions, 'project' | 'store'>) => {
  const root = path.join(process.cwd(), project)
  const neoTempDir = path.join(root, '.neo')
  const config = await loadConfig(neoTempDir)
  let variables = { inputs: { project } }
  if (config?.mario) {
    // TODO: maybe change in the future
    const github = await gitconfig.get({ location: 'global' })
    variables = merge(variables, { inputs: github })
    console.log()
    console.log(`❯ Run mario ${pc.green(config.mario)}`)
    if (isYaml(config.mario)) {
      await runMario(path.resolve(neoTempDir, config.mario), { cwd: root, variables })
      fsExtra.removeSync(neoTempDir)
      return
    }
    const alias = config.mario
    const target = path.join(neoTempDir, '.mario')
    fsExtra.ensureDirSync(target)
    const prepare = new Listr([
      {
        title: `Download mario generator ${alias}`,
        task: async () => {
          const response = await store.pm.request({ alias, latest: true })
          await store.pm.import(target, await response.files?.())
          return true
        },
      },
    ])
    await prepare.run()
    await runMario(path.join(target, 'index.yaml'), { cwd: root, variables })
    fsExtra.removeSync(neoTempDir)
  }
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
  const tasks = {
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
        return generate({ project, store, templateResponse: ctx.templateResponse })
      },
    },
    // postgenerate
    postgenerate: {
      title: 'Clean Up',
      task: async () => {
        return postgenerate({ project, isMono })
      },
    },
  }
  return new Listr(Object.values(tasks) as ListrTask<any>[])
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
    await runTemplateMario({ project, store })
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
        await runTemplateMario({ project: answers.project, store })
        console.log()
        logger.success(`  🎉 ${answers.project} created, Happy hacking!`)
      })
      .catch(logger.fatal)
  }
}
