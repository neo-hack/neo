import consola from 'consola'
import gulp from 'gulp'
import gulpDebug from 'gulp-debug'
import filter from 'gulp-filter'
import readYaml from 'read-yaml-file'

import { LIFE_CYCLES } from '../constants'
import { hooks } from '../utils/hooks'
import { debug, prefix } from '../utils/logger'
import { run } from './run'
import { builtInUses } from './uses'

import type { Consola } from 'consola'
import type {
  Context,
  Job,
  Step,
  Workflow,
} from '../interface'
import type { RunOptions } from './run'

export const readWorkflowSchema = async (filepath: string) => {
  const workflow = await readYaml<Workflow>(filepath)
  return workflow
}

interface CreateJobOptions {
  runAction: (id: string, args: any, options: Step, ctx: Context) => any
  runShell: (args: RunOptions, options: Step, ctx: Context) => any
  // job name fallback
  key: string
  job: Job
  cwd?: string
  variables?: Context['variables']
}

export const createJob = async ({ job, key, ...options }: CreateJobOptions) => {
  return async () => {
    const taskName = job.name || key
    const task = async () => {
      const pipes = async () => {
        let stream = gulp.src(job.paths ? job.paths : ['*'], {
          cwd: options.cwd!,
          allowEmpty: true,
          dot: true,
        })
        stream = stream.pipe(filter(['**', '.**', '!**/node_modules/**']))
        if (process.env.DEBUG?.includes(`${prefix}:job`)) {
          stream = stream.pipe(gulpDebug({ title: taskName }))
        }
        for (const step of job.steps || []) {
          const extra: Step = { 'continue-on-error': step['continue-on-error'] }
          if (!step.uses && !step.run) {
            continue
          }
          if (step.uses) {
            const cb = await options
              .runAction?.(step.uses, step.with, extra, {
                cwd: options.cwd!,
                debug: debug.uses,
                variables: options.variables,
              })
              .catch((error: Error) => {
                consola.error(error)
                if (!extra['continue-on-error']) {
                  hooks.callHook(taskName, { job: taskName, error })
                  stream.emit('error')
                } else {
                  stream.emit('success')
                }
              })
            if (!cb) {
              continue
            }
            const cbs = Array.isArray(cb) ? cb : [cb]
            cbs.forEach((cb) => {
              stream = stream.pipe(cb).on('error', (error: Error) => {
                if (!extra['continue-on-error']) {
                  hooks.callHook(taskName, { job: taskName, error })
                  stream.emit('error')
                } else {
                  stream.emit('success')
                }
              })
            })
          }
          // exec shell
          if (step.run) {
            const cb = options.runShell?.({ commands: step.run, ...step.with }, extra, {
              cwd: options.cwd!,
              debug: debug.run,
            })
            stream = stream.pipe(cb)
          }
          hooks.callHook(LIFE_CYCLES.STEP, { step: step.name })
        }
        stream = stream.pipe(
          gulp.dest((file) => {
            return file.base
          }),
        )
        return stream
      }
      return new Promise((resolve, reject) => {
        pipes().then((stream) => {
          stream.on('end', resolve)
          stream.on('success', resolve)
          stream.on('error', reject)
        })
      }).then(() => {
        hooks.callHook(taskName, { job: taskName })
      })
    }
    gulp.task(taskName || key, task)
    return {
      job: taskName,
    }
  }
}

const runAction: CreateJobOptions['runAction'] = async (id, args, _options, ctx) => {
  debug.uses('run uses %s with %O', id, args)
  const action = builtInUses[id]
  if (!action) {
    consola.error(`${action} not found, dynamic import not support now!`)
    return false
  }
  const cb = await action(args, ctx)
  return cb
}

const runShell: CreateJobOptions['runShell'] = (args, options, ctx) => {
  debug.run('exec command %O', args)
  return run({ ...args, ignoreErrors: options['continue-on-error'] }, ctx)
}

export interface CreateWorkflowOptions {
  schema: Workflow
  cwd?: CreateJobOptions['cwd']
  logLevel?: Consola['level']
  variables?: Context['variables']
}

export const createWorkflow = async ({
  schema,
  cwd = process.cwd(),
  ...options
}: CreateWorkflowOptions) => {
  const keys = Object.keys(schema.jobs || {})
  consola.level = options.logLevel ?? consola.level
  return async (): Promise<boolean> => {
    const jobs: string[] = []
    for (const key of keys) {
      debug.job('create job %s on cwd %s', key, cwd)
      // TODO: curry is wild
      const job = await createJob({
        job: schema.jobs![key],
        runAction,
        runShell,
        key,
        cwd,
        ...options,
      })
      const { job: name } = await job()
      jobs.push(name)
    }
    return new Promise((resolve, reject) => {
      gulp.series(...jobs)((error) => {
        if (error) {
          consola.error(error)
          reject(error)
        }
        resolve(true)
      })
    })
  }
}
