import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/fixtures/run/run.yaml'), {
  cwd: r('test/fixtures/run'),
})
await workflow.start()
