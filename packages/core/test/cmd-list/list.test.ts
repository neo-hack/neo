import { execNeo, mockLockFile, storeDir } from '../helpers'

beforeAll(async () => {
  await mockLockFile()
})

describe('command list', () => {
  it('should contain all templates listed in constants', async () => {
    const { stdout } = await execNeo(['list', '--store-dir', storeDir])
    expect(stdout).toMatchSnapshot()
  })
})
