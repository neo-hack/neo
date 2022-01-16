import { createWorkflow, readWorkflowSchema, CreateWorkflowOptions } from './workflow'
export { hooks } from './utils/hooks'

export const create = async (
  filepath: string,
  options: Omit<CreateWorkflowOptions, 'schema'> = {},
) => {
  const schema = await readWorkflowSchema(filepath)
  const workflow = await createWorkflow({ schema, ...options })
  return {
    schema,
    start: async () => {
      await workflow()
    },
  }
}
