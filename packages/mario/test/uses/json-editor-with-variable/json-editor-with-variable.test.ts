import { r } from '../../helpers'
import { create } from '../../../src'

import fs from 'fs-extra'

beforeAll(() => {
  fs.copySync(
    r('test/uses/json-editor-with-variable/input'),
    r('test/uses/json-editor-with-variable/output'),
  )
})

it('use jsoneditor should work', async () => {
  const workflow = await create(
    r('test/uses/json-editor-with-variable/json-editor-with-variable.yaml'),
    {
      cwd: r('test/uses/json-editor-with-variable'),
      variables: { inputs: { project: 'project' } },
    },
  )
  await workflow.start()
  expect(r('test/uses/json-editor-with-variable/expected/input.json')).toMatchFile(
    r('test/uses/json-editor-with-variable/output/input.json'),
  )
})
