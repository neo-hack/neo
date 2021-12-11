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
import createLockFile from './utils/lock-file'
import createTemplatePM from './utils/pm'

type CreateOptions = {
  template: string
  project: string
  pm: AsyncReturnType<typeof createTemplatePM>
  lockFile: ReturnType<typeof createLockFile>
}

/**
 * @description generate template files
 * @todo move tpl parts to @aiou/workflows
 */
const generate = async ({
  project,
  pm,
  templateResponse,
  lockFile,
}: Omit<CreateOptions, 'template'> & {
  templateResponse: PackageResponse
}) => {
  const manifest = templateResponse.body.manifest
  debugLogger.create('source template %s@%s', manifest?.name, manifest?.version)
  await pm.import(project, await templateResponse.files?.())
  await lockFile.updateTemplates({
    [lockFile.getTemplateId(manifest!.name, manifest!.version)]: {},
  })
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

const createTask = ({ template, project, pm, lockFile }: CreateOptions) => {
  let templateResponse: PackageResponse
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
        templateResponse = await pm.request(template)
      },
    },
    generate: {
      title: 'Generate project',
      task: async () => {
        return generate({ project, pm, templateResponse, lockFile })
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
  const pm = await createTemplatePM(options)
  const lockFile = createLockFile(options)
  if (template && project) {
    const task = createTask({ template, project, pm, lockFile })
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
          choices: await lockFile.readTemplates(),
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
          pm,
          lockFile,
        })
        await task.run()
        console.log()
        logger.success(`🎉 ${template} Generated, Happy hacking!`)
      })
      .catch(logger.fatal)
  }
}
