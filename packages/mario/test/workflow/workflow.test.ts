import { r } from '../helpers'

import { execa } from 'execa'

it('prepack workflow', async () => {
  await execa('esmrua', [r('test/workflow/prepack.ts'), 'main'])
})
