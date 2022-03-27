import { r } from '../../helpers'
import { create } from '../../../src'

import fs from 'fs-extra'

beforeAll(() => {
  fs.copySync(r('test/uses/json-editor/input'), r('test/uses/json-editor/output'))
})

it('use jsoneditor should work', async () => {
  const workflow = await create(r('test/uses/json-editor/json-editor.yaml'), {
    cwd: r('test/uses/json-editor'),
  })
  await workflow.start()
  expect(r('test/uses/json-editor/output/input.json')).toMatchFile(
    r('test/uses/json-editor/expected/input.json'),
  )
})
