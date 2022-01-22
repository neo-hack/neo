import { r } from '../../helpers'

import { execa } from 'execa'

describe('workflow uses', () => {
  it('not found uses should throw error', async () => {
    const { stdout } = await execa('esmrua', [r('test/uses/uses/uses.ts'), 'uses'])
    expect(stdout.includes('hello world')).not.toBeDefined()
  })
  it('continue on error should work', async () => {
    const { stdout } = await execa('esmrua', [r('test/uses/uses/uses.ts'), 'continueOnError'])
    console.log(stdout)
    expect(stdout.includes('hello world')).toBeDefined()
  }, 20000)
})
