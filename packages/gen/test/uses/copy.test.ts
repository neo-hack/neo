import { r } from '../helpers'

import { execa } from 'execa'
import { compare } from 'comparedir-test'
import fs from 'fs-extra'

beforeAll(() => {
  fs.emptyDirSync(r('test/fixtures/copy/output'))
})

it('use action should work', async () => {
  await execa('esmo', [r('test/fixtures/copy/copy.ts')])
  await compare(r('test/fixtures/copy/expected'), r('test/fixtures/copy/output'))
})
