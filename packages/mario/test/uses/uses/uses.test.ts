import { r } from '../../helpers'

import { execa } from 'execa'

describe('workflow uses', () => {
  it('not found uses should throw error', async () => {
    const { stderr } = await execa('esmrua', [r('test/uses/uses/uses.ts'), 'uses'])
    expect(stderr).toBeDefined()
  })
  it('continue on error should work', async () => {
    const { stdout } = await execa('esmrua', [r('test/uses/uses/uses.ts'), 'continueOnError'])
    expect(stdout.includes('hello world')).toBeDefined()
  })
})
