import { pick } from 'lodash-es'

import { createWorkflow, readWorkflowSchema } from './workflow'

import type { Workflow } from './interface'
import type { CreateWorkflowOptions } from './workflow'

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
      return workflow()
    },
  }
}
