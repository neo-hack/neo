import {
  execNeo,
  mockLockFile,
  storeDir,
} from '../helpers'

beforeAll(async () => {
  await mockLockFile()
})

describe('command list', () => {
  it('should contain all templates in store', async () => {
    const { stdout } = await execNeo(['list', '--store-dir', storeDir])
    expect(stdout).toMatchSnapshot()
  })
  it('should show template list filter by preset', async () => {
    const { stdout } = await execNeo(['list', '--store-dir', storeDir, '--preset', 'neo'])
    expect(stdout).toMatchSnapshot()
  })
  it('should show empty template list with wrong preset', async () => {
    const { stdout } = await execNeo(['list', '--store-dir', storeDir, '--preset', 'aiou'])
    expect(stdout).toMatchSnapshot()
  })
})
