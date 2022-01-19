import { createWorkflow, readWorkflowSchema, CreateWorkflowOptions } from './workflow'
export { hooks } from './utils/hooks'
// export { LogLevel } from 'consola'

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
