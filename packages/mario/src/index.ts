import { createWorkflow, readWorkflowSchema, CreateWorkflowOptions } from './workflow'
import { pick } from 'lodash-es'
import { Workflow } from './interface'

export { hooks } from './utils/hooks'
// export { LogLevel } from 'consola'

export type CreateOptions = Omit<CreateWorkflowOptions, 'schema'> & {
  jobs?: string[]
}

export const create = async (filepath: string, options: CreateOptions = {}) => {
  const schema = await readWorkflowSchema(filepath)
  if (options.jobs) {
    schema.jobs = pick(schema.jobs, options.jobs) as Workflow['jobs']
  }
  const workflow = await createWorkflow({ schema, ...options })
  return {
    schema,
    start: async () => {
      await workflow()
    },
  }
}
