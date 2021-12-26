import { execNeo } from './helpers'

describe('command whoami', () => {
  it('should print neo', async () => {
    const { stdout, stderr } = await execNeo(['whoami'])
    expect(stderr).toBe('')
    expect(stdout).toMatchSnapshot()
  })
})
