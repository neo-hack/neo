import { r } from './helpers'

import { execa } from 'execa'

it('prepack workflow', async () => {
  await execa('esmo', [r('test/fixtures/prepack/prepack.ts')])
})
