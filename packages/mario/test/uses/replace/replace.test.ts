import { r } from '../../helpers'

import { execa } from 'execa'
import fs from 'fs-extra'
import { compare } from 'comparedir-test'

beforeAll(() => {
  fs.copySync(r('test/uses/replace/input'), r('test/uses/replace/output'))
})

it('uses replace should work', async () => {
  await execa('esmrua', [r('test/uses/replace/replace.ts'), 'main'])
  await compare(r('test/uses/replace/expected'), r('test/uses/replace/output'))
})
