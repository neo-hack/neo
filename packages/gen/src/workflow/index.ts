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
}

export const createJob = ({ job, ...options }: CreateJobOptions) => {
  return async () => {
    console.log(job, options)
    hooks.callHook(LIFE_CYCLES.JOB, { name: job.name })
    let stream = gulp.src(job.paths ? [job.paths] : [])
    // for (const step of job.steps || []) {
    //   console.log(step)
    //   const id = step.action || step.uses
    //   if (!id) {
    //     continue
    //   }
    //   const type = step.action ? 'action' : 'uses'
    //   stream = stream.pipe(options.runAction?.(id, type, step.with))
    // }
    // TODO:
    stream = stream.pipe(gulp.dest('output'))
    return stream
  }
}

type CreateWorkflowOptions = {
  schema: Workflow
}

const runAction: CreateJobOptions['runAction'] = (id, type, args) => {
  console.log(id, type, args)
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

export const createWorkflow = async ({ schema }: CreateWorkflowOptions) => {
  const jobNames = Object.keys(schema.jobs || {})
  console.log(jobNames)
  return async () => {
    hooks.callHook(LIFE_CYCLES.START)
    for (const name of jobNames) {
      hooks.callHook(LIFE_CYCLES.BEFORE_JOB, { name })
      const job = createJob({ job: schema.jobs![name], runAction })
      await job()
      hooks.callHook(LIFE_CYCLES.AFTER_JOB, { name })
    }
    hooks.callHook(LIFE_CYCLES.FINISH)
  }
}
