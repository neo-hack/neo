import { r } from '../../helpers'
import { create } from '../../../src'

import fs from 'fs-extra'

beforeAll(() => {
  fs.copySync(
    r('test/uses/replace-with-variable/input'),
    r('test/uses/replace-with-variable/output'),
  )
})

it('uses replace-with-variable should work', async () => {
  const workflow = await create(r('test/uses/replace-with-variable/replace-with-variable.yaml'), {
    cwd: r('test/uses/replace-with-variable'),
    variables: {
      outputs: {
        variable: 'global',
      },
    },
  })
  await workflow.start()
  expect(r('test/uses/replace-with-variable/output/index.ts')).toMatchFile(
    r('test/uses/replace-with-variable/expected/index.ts'),
  )
})
