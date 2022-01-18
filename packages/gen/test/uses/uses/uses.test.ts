import { r } from '../../helpers'

import { execa } from 'execa'

describe('workflow uses', () => {
  // it('not found uses should throw error', async () => {
  //   const { stderr } = await execa('esmrua', [r('test/uses/uses/uses.ts'), 'uses'])
  //   expect(stderr).toBeDefined()
  // })
  it('continue on error should work', async () => {
    const { stderr, stdout } = await execa('esmo', [r('test/uses/uses/uses.ts'), 'continueOnError'])
    console.log(stderr, stdout)
    expect(stderr).toBeDefined()
  })
})
