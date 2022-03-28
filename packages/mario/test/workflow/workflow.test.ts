import { r } from '../helpers'
import { create } from '../../src'

it('prepack workflow', async () => {
  const workflow = await create(r('test/workflow/prepack.yaml'), {
    cwd: r('test/workflow'),
  })
  await workflow.start()
}, 100000)
