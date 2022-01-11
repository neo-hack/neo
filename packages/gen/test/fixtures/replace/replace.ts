import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/fixtures/replace/replace.yaml'))
await workflow.start()
