import { r } from '../helpers'

import { execa } from 'execa'
import fs from 'fs-extra'
import { compare } from 'comparedir-test'

beforeAll(() => {
  fs.copySync(r('test/fixtures/replace/input'), r('test/fixtures/replace/output'))
})

it('uses replace should work', async () => {
  await execa('esmo', [r('test/fixtures/replace/replace.ts')])
  await compare(r('test/fixtures/replace/expected'), r('test/fixtures/replace/output'))
})
