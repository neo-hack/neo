import { r } from '../../helpers'

import { execa } from 'execa'
import { compare } from 'comparedir-test'
import fs from 'fs-extra'

beforeAll(() => {
  fs.emptyDirSync(r('test/uses/copy/output'))
})

it('copy action should work', async () => {
  await execa('esmrua', [r('test/uses/copy/copy.ts'), 'main'])
  await compare(r('test/uses/copy/expected'), r('test/uses/copy/output'))
})
