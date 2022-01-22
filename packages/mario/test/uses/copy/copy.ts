import { create } from '../../../src'
import { r } from '../../helpers'

export const main = async () => {
  const workflow = await create(r('test/uses/copy/copy.yaml'), {
    cwd: r('test/uses/copy'),
  })
  await workflow.start()
}
