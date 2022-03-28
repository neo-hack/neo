import { r } from '../../helpers'
import { create } from '../../../src'

import { expect } from 'vitest'
import fs from 'fs-extra'

beforeAll(() => {
  fs.emptyDirSync(r('test/uses/copy/output'))
})

it('copy action should work', async () => {
  const workflow = await create(r('test/uses/copy/copy.yaml'), {
    cwd: r('test/uses/copy'),
  })
  await workflow.start()
  expect(r('test/uses/copy/output/assets.ts')).toMatchFile(r('test/uses/copy/expected/assets.ts'))
})
