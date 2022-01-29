import { r } from '../../helpers'

import { execa } from 'execa'
import fs from 'fs-extra'
import { compare } from 'comparedir-test'

beforeAll(() => {
  fs.copySync(
    r('test/uses/replace-with-variable/input'),
    r('test/uses/replace-with-variable/output'),
  )
})

it('uses replace-with-variable should work', async () => {
  await execa('esmrua', [r('test/uses/replace-with-variable/replace-with-variable.ts'), 'main'])
  await compare(
    r('test/uses/replace-with-variable/expected'),
    r('test/uses/replace-with-variable/output'),
  )
})
