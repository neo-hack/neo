import { execNeo, mockLockFile, storeDir } from '../helpers'

beforeAll(async () => {
  await mockLockFile()
})

describe('command list config', () => {
  it('list configs should list all', async () => {
    const { stdout } = await execNeo([
      'list',
      'configs',
      '--store-dir',
      storeDir,
      '--no-interactive',
      true,
    ])
    expect(stdout).toMatchSnapshot()
  })

  it('list configs should list filtered by preset', async () => {
    const { stdout } = await execNeo([
      'list',
      'configs',
      '--store-dir',
      storeDir,
      '--no-interactive',
      true,
      '--preset',
      'neo',
    ])
    expect(stdout).toMatchSnapshot()
  })
})
