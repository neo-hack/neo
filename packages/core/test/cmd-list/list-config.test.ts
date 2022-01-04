import { execNeo, mockLockFile, storeDir } from '../helpers'

beforeAll(async () => {
  await mockLockFile()
})

describe('command list', () => {
  it('should list configs', async () => {
    const { stdout } = await execNeo(['list', 'configs', '--store-dir', storeDir])
    expect(stdout).toMatchSnapshot()
  })
})
