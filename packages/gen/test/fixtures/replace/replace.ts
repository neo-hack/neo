import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/fixtures/replace/replace.yaml'), {
  cwd: r('test/fixtures/replace'),
})
await workflow.start()
