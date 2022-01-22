import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/uses/replace/replace.yaml'), {
  cwd: r('test/uses/replace'),
})
await workflow.start()
