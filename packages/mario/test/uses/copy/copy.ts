import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/uses/copy/copy.yaml'), {
  cwd: r('test/uses/copy'),
})
await workflow.start()
