import { r } from '../helpers'

import { execa } from 'execa'
import fs from 'fs-extra'

beforeAll(() => {
  fs.copySync(r('test/fixtures/clean/input'), r('test/fixtures/clean/output'))
})

it('uses clean should work', async () => {
  await execa('esmo', [r('test/fixtures/clean/clean.ts')])
  expect(fs.existsSync(r('test/fixtures/clean/output/index.ts'))).toBe(false)
})
