import { r } from './helpers'

import { create } from '../src'

describe('create', () => {
  it('workflow should filtered by jobs', async () => {
    const workflow = await create(r('test/workflow/prepack.yaml'), {
      cwd: r('test/workflow'),
      jobs: ['CI'],
    })
    expect(workflow.schema).toMatchSnapshot()
  })
})
