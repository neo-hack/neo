import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/fixtures/prepack/prepack.yaml'), {
  cwd: r('test/fixtures/prepack'),
})
await workflow.start()
