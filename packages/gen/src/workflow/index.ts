import readYaml from 'read-yaml-file'
import gulp from 'gulp'
import consola from 'consola'
import { createHooks } from 'hookable'

import { Workflow, Job, Context } from '../interface'
import { LIFE_CYCLES } from '../constants'
import { builtInUses } from './uses'
import { run, RunOptions } from './run'
import { debug } from '../utils/logger'

const hooks = createHooks<any>()

export const readWorkflowSchema = async (filepath: string) => {
  const workflow = await readYaml<Workflow>(filepath)
  return workflow
}

type CreateJobOptions = {
  runAction: (id: string, args: any, ctx: Context) => any
  runShell: (args: RunOptions, ctx: Context) => any
  job: Job
  cwd?: string
}

export const createJob = ({ job, ...options }: CreateJobOptions) => {
  return async () => {
    hooks.callHook(LIFE_CYCLES.JOB, { name: job.name })
    debug.job('create job %s on cwd %s', job.name, options.cwd)
    let stream = gulp.src(job.paths ? [job.paths] : [], { cwd: options.cwd! })
    for (const step of job.steps || []) {
      if (!step.uses && !step.run) {
        continue
      }
      try {
        // run action
        if (step.uses) {
          const cb = options.runAction?.(step.uses, step.with, {
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
}

const runAction: CreateJobOptions['runAction'] = (id, args, ctx) => {
  debug.uses('run uses %s with %O', id, args)
  const action = builtInUses[id]
  if (!action) {
    consola.error(`${action} not found, dynamic import not support now!`)
    return false
  }
  return action(args, ctx)
}

const runShell: CreateJobOptions['runShell'] = (args, ctx) => {
  debug.run('exec command %O', args)
  return run(args, ctx)
}

export type CreateWorkflowOptions = {
  schema: Workflow
  cwd?: CreateJobOptions['cwd']
}

export const createWorkflow = async ({
  schema,
  cwd = process.cwd(),
  ...options
}: CreateWorkflowOptions) => {
  const jobNames = Object.keys(schema.jobs || {})
  return async () => {
    hooks.callHook(LIFE_CYCLES.START)
    for (const name of jobNames) {
      hooks.callHook(LIFE_CYCLES.BEFORE_JOB, { name })
      const job = createJob({ job: schema.jobs![name], runAction, runShell, cwd, ...options })
      await job()
      hooks.callHook(LIFE_CYCLES.AFTER_JOB, { name })
    }
    hooks.callHook(LIFE_CYCLES.FINISH)
  }
}
