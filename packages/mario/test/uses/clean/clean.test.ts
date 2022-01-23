import { r } from '../../helpers'

import { execa } from 'execa'
import fs from 'fs-extra'

beforeAll(() => {
  fs.copySync(r('test/uses/clean/input'), r('test/uses/clean/output'))
})

it('uses clean should work', async () => {
  await execa('esmrua', [r('test/uses/clean/clean.ts'), 'main'])
  expect(fs.existsSync(r('test/uses/clean/output/index.ts'))).toBe(false)
})
