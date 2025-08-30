import { execa } from 'execa'

import { r } from '../../helpers'

describe('workflow uses', () => {
  it('not found uses should throw error', async () => {
    const { stderr } = await execa('tsx', [r('test/uses/uses/uses.ts')])
    expect(stderr).toBeDefined()
  })
  it('continue on error should work', async () => {
    const { stdout } = await execa('tsx', [r('test/uses/uses/use-continue-on-error.ts')])
    expect(stdout.includes('hello world')).toBeDefined()
  })
})
