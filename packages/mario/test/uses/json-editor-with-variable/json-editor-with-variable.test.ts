import { r } from '../../helpers'

import { execa } from 'execa'
import fs from 'fs-extra'
import { compare } from 'comparedir-test'

beforeAll(() => {
  fs.copySync(
    r('test/uses/json-editor-with-variable/input'),
    r('test/uses/json-editor-with-variable/output'),
  )
})

it('use jsoneditor should work', async () => {
  await execa('esmrua', [
    r('test/uses/json-editor-with-variable/json-editor-with-variable.ts'),
    'main',
  ])
  await compare(
    r('test/uses/json-editor-with-variable/expected'),
    r('test/uses/json-editor-with-variable/output'),
  )
})
