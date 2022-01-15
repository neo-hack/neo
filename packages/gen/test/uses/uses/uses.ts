import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/uses/uses/uses.yaml'), {
  cwd: r('test/uses/uses'),
})
await workflow.start()
