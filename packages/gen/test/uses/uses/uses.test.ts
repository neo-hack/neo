import { r } from '../../helpers'

import { execa } from 'execa'

describe('workflow uses', () => {
  it('not found uses should throw error', async () => {
    const { stderr } = await execa('esmo', [r('test/uses/uses/uses.ts')])
    expect(stderr).toBeDefined()
  })
  it('continue on error should work', async () => {
    const { stderr } = await execa('esmo', [r('test/uses/uses/uses.ts')])
    expect(stderr).toBeDefined()
  })
})
