import { create } from '../../../src'
import { r } from '../../helpers'

export const uses = async () => {
  const workflow = await create(r('test/uses/uses/uses.yaml'), {
    cwd: r('test/uses/uses'),
  })
  await workflow.start()
}

export const continueOnError = async () => {
  const workflow = await create(r('test/uses/uses/continue-on-error.yaml'), {
    cwd: r('test/uses/uses'),
  })
  await workflow.start()
}

// const workflow = await create(r('test/uses/uses/continue-on-error.yaml'), {
//   cwd: r('test/uses/uses'),
// })
// await workflow.start()
