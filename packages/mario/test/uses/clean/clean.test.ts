import { r } from '../../helpers'
import { create } from '../../../src'

import fs from 'fs-extra'

beforeAll(() => {
  fs.copySync(r('test/uses/clean/input'), r('test/uses/clean/output'))
})

it('uses clean should work', async () => {
  const workflow = await create(r('test/uses/clean/clean.yaml'), {
    cwd: r('test/uses/clean'),
  })
  await workflow.start()
  expect(fs.existsSync(r('test/uses/clean/output/index.ts'))).toBe(false)
})
