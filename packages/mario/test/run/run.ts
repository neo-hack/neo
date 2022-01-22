import { create } from '../../src'
import { r } from '../helpers'

const workflow = await create(r('test/run/run.yaml'), {
  cwd: r('test/run'),
})
await workflow.start()
