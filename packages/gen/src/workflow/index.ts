import readYaml from 'read-yaml-file'
import gulp from 'gulp'
import consola, { Consola } from 'consola'
import filter from 'gulp-filter'

import { hooks } from '../utils/hooks'
import { Workflow, Job, Context } from '../interface'
import { LIFE_CYCLES } from '../constants'
import { builtInUses } from './uses'
import { run, RunOptions } from './run'
import { debug } from '../utils/logger'

export const readWorkflowSchema = async (filepath: string) => {
  const workflow = await readYaml<Workflow>(filepath)
  return workflow
}

type CreateJobOptions = {
  runAction: (id: string, args: any, ctx: Context) => any
  runShell: (args: RunOptions, ctx: Context) => any
  // job name fallback
  key: string
  job: Job
  cwd?: string
}

export const createJob = async ({ job, key, ...options }: CreateJobOptions) => {
  return async () => {
    const taskName = job.name || key
    const task = async () => {
      const pipes = async () => {
        let stream = gulp.src(job.paths ? job.paths : ['*'], { cwd: options.cwd!, dot: true })
        for (const step of job.steps || []) {
          stream = stream.pipe(filter(['**', '!**/node_modules/**']))
          if (!step.uses && !step.run) {
            continue
          }
          try {
            // run action
            if (step.uses) {
              const cb = await options.runAction?.(step.uses, step.with, {
                cwd: options.cwd!,
                debug: debug.uses,
              })
              if (!cb) {
                continue
              }
              stream = stream.pipe(cb)
            }
            // exec shell
            if (step.run) {
              const cb = options.runShell?.(
                { commands: step.run, ...step.with },
                { cwd: options.cwd!, debug: debug.run },
              )
              if (!cb) {
                continue
              }
              stream = stream.pipe(cb)
            }
            step.name && hooks.callHook(step.name, { step: step.name })
            hooks.callHook(LIFE_CYCLES.STEP, { step: step.name })
          } catch (e) {
            consola.error(e)
            if (!step['continue-on-error']) {
              throw e
            }
          }
        }
        stream = stream.pipe(
          gulp.dest((file) => {
            return file.base
          }),
        )
        return stream
      }
      return new Promise((resolve) => {
        pipes().then((stream) => {
          stream.on('end', resolve)
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

const runAction: CreateJobOptions['runAction'] = async (id, args, ctx) => {
  debug.uses('run uses %s with %O', id, args)
  const action = builtInUses[id]
  if (!action) {
    consola.error(`${action} not found, dynamic import not support now!`)
    return false
  }
  const cb = await action(args, ctx)
  return cb
}

const runShell: CreateJobOptions['runShell'] = (args, ctx) => {
  debug.run('exec command %O', args)
  return run(args, ctx)
}

export type CreateWorkflowOptions = {
  schema: Workflow
  cwd?: CreateJobOptions['cwd']
  logLevel?: Consola['level']
}

export const createWorkflow = async ({
  schema,
  cwd = process.cwd(),
  ...options
}: CreateWorkflowOptions) => {
  const keys = Object.keys(schema.jobs || {})
  consola.level = options.logLevel ?? consola.level
  return async () => {
    hooks.callHook(LIFE_CYCLES.START)
    const jobs: string[] = []
    for (const key of keys) {
      debug.job('create job %s on cwd %s', key, cwd)
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
    gulp.series(...jobs)((error) => {
      if (!error) {
        hooks.callHook(LIFE_CYCLES.FINISH)
        return
      }
      consola.error(error)
    })
  }
}
