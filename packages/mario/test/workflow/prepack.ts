import { create } from '../../src'
import { r } from '../helpers'

export const main = async () => {
  const workflow = await create(r('test/workflow/prepack.yaml'), {
    cwd: r('test/workflow'),
  })
  await workflow.start()
}
