import { r } from '../../helpers'

import { execa } from 'execa'
import fs from 'fs-extra'
import { compare } from 'comparedir-test'

beforeAll(() => {
  fs.copySync(r('test/uses/json-editor/input'), r('test/uses/json-editor/output'))
})

it('use jsoneditor should work', async () => {
  await execa('esmo', [r('test/uses/json-editor/json-editor.ts')])
  await compare(r('test/uses/json-editor/expected'), r('test/uses/json-editor/output'))
})
