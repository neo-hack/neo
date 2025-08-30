import { create } from '../../../src'
import { r } from '../../helpers'

const continueOnError = async () => {
  const workflow = await create(r('test/uses/uses/continue-on-error.yaml'), {
    cwd: r('test/uses/uses'),
  })
  await workflow.start()
}

continueOnError()
