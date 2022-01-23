import { create } from '../../src'
import { r } from '../helpers'

export const main = async () => {
  const workflow = await create(r('test/run/run.yaml'), {
    cwd: r('test/run'),
  })
  await workflow.start()
}
