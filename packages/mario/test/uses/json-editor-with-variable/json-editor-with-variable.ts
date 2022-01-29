import { create } from '../../../src'
import { r } from '../../helpers'

export const main = async () => {
  const workflow = await create(
    r('test/uses/json-editor-with-variable/json-editor-with-variable.yaml'),
    {
      cwd: r('test/uses/json-editor-with-variable'),
      variables: { inputs: { project: 'project' } },
    },
  )
  await workflow.start()
}
