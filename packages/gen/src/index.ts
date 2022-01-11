import { createWorkflow, readWorkflowSchema } from './workflow'

export const create = async (filepath: string) => {
  const schema = await readWorkflowSchema(filepath)
  const workflow = await createWorkflow({ schema })
  return {
    start: async () => {
      await workflow()
    },
  }
}
