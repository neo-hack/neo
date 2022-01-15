import { r } from '../helpers'

import { execa } from 'execa'
import fs from 'fs-extra'
import { compare } from 'comparedir-test'

beforeAll(() => {
  fs.copySync(r('test/fixtures/json-editor/input'), r('test/fixtures/json-editor/output'))
})

it('use jsoneditor should work', async () => {
  await execa('esmo', [r('test/fixtures/json-editor/json-editor.ts')])
  await compare(r('test/fixtures/json-editor/expected'), r('test/fixtures/json-editor/output'))
})
