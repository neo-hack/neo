import readYaml from 'read-yaml-file'
import gulp from 'gulp'
import { createHooks } from 'hookable'

import { Workflow, Job } from '../interface'
import { LIFE_CYCLES } from '../constants'
import { builtIn } from './actions'

const hooks = createHooks<any>()

export const readWorkflowSchema = async (filepath: string) => {
  const workflow = await readYaml<Workflow>(filepath)
  return workflow
}

type CreateJobOptions = {
  runAction: (id: string, type: 'action' | 'uses', args: any) => any
  job: Job
  cwd?: string
}

export const createJob = ({ job, ...options }: CreateJobOptions) => {
  return async () => {
    hooks.callHook(LIFE_CYCLES.JOB, { name: job.name })
    let stream = gulp.src(job.paths ? [job.paths] : [], { cwd: options.cwd })
    for (const step of job.steps || []) {
      const id = step.action || step.uses
      if (!id) {
        continue
      }
      const type = step.action ? 'action' : 'uses'
      stream = stream.pipe(options.runAction?.(id, type, step.with))
    }
    // TODO:
    // stream = stream.pipe(gulp.dest('output'))
    stream = stream.pipe(
      gulp.dest((file) => {
        console.log(file.base)
        return file.base
      }),
    )
    return stream
  }
}

const runAction: CreateJobOptions['runAction'] = (id, type, args) => {
  if (type === 'uses') {
    // dynamic load action not support now
    return false
  }
  const action = builtIn[id]
  if (!action) {
    return false
  }
  return action(args)
}

export type CreateWorkflowOptions = {
  schema: Workflow
  cwd?: CreateJobOptions['cwd']
}

export const createWorkflow = async ({ schema, ...options }: CreateWorkflowOptions) => {
  const jobNames = Object.keys(schema.jobs || {})
  return async () => {
    hooks.callHook(LIFE_CYCLES.START)
    for (const name of jobNames) {
      hooks.callHook(LIFE_CYCLES.BEFORE_JOB, { name })
      const job = createJob({ job: schema.jobs![name], runAction, ...options })
      await job()
      hooks.callHook(LIFE_CYCLES.AFTER_JOB, { name })
    }
    hooks.callHook(LIFE_CYCLES.FINISH)
  }
}
