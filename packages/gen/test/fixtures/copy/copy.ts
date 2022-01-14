import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/fixtures/copy/copy.yaml'), {
  cwd: r('test/fixtures/copy'),
})
await workflow.start()
