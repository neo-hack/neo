import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/uses/clean/clean.yaml'), {
  cwd: r('test/uses/clean'),
})
await workflow.start()
