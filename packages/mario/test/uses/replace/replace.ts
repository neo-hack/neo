import { create } from '../../../src'
import { r } from '../../helpers'

export const main = async () => {
  const workflow = await create(r('test/uses/replace/replace.yaml'), {
    cwd: r('test/uses/replace'),
  })
  await workflow.start()
}
