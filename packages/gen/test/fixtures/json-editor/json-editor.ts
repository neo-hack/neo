import { create } from '../../../src'
import { r } from '../../helpers'

const workflow = await create(r('test/fixtures/json-editor/json-editor.yaml'), {
  cwd: r('test/fixtures/json-editor'),
})
await workflow.start()
