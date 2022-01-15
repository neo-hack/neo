import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/fixtures/clean/clean.yaml'), {
  cwd: r('test/fixtures/clean'),
})
await workflow.start()
