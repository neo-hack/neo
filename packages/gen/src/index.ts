import { createWorkflow, readWorkflowSchema, CreateWorkflowOptions } from './workflow'
export { hooks } from './utils/hooks'
export { LIFE_CYCLES } from './constants'

export const create = async (
  filepath: string,
  options: Omit<CreateWorkflowOptions, 'schema'> = {},
) => {
  const schema = await readWorkflowSchema(filepath)
  const workflow = await createWorkflow({ schema, ...options })
  return {
    start: async () => {
      await workflow()
    },
  }
}
