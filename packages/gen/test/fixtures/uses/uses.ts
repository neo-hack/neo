import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/fixtures/uses/uses.yaml'), {
  cwd: r('test/fixtures/uses'),
})
await workflow.start()
