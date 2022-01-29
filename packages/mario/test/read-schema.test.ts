import { readWorkflowSchema } from '../src/workflow'
import { r } from './helpers'

describe('read schema', () => {
  it('read schema takes array as input', async () => {
    const schema = await readWorkflowSchema(r('test/assets/array-input.yaml'))
    expect(schema).toMatchSnapshot()
  })

  it('read complete workflow schema', async () => {
    const schema = await readWorkflowSchema(r('test/assets/workflow.yaml'))
    expect(schema).toMatchSnapshot()
  })

  it('read workflow contain regexp', async () => {
    const schema = await readWorkflowSchema(r('test/assets/regexp.yaml'))
    expect(schema).toMatchSnapshot()
  })
})
