import {
  execNeo,
  mockLockFile,
  storeDir as defaultStoreDir,
} from '../helpers'

let storeDir: string = defaultStoreDir
beforeAll(async () => {
  const { storeDir: mockedStoreDir } = await mockLockFile()
  storeDir = mockedStoreDir
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
