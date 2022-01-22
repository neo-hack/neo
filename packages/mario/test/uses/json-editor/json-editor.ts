import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/uses/json-editor/json-editor.yaml'), {
  cwd: r('test/uses/json-editor'),
})
await workflow.start()
