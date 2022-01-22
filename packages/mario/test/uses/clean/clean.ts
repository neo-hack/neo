import { create } from '../../../src'
import { r } from '../../helpers'

export const main = async () => {
  const workflow = await create(r('test/uses/clean/clean.yaml'), {
    cwd: r('test/uses/clean'),
  })
  await workflow.start()
}
