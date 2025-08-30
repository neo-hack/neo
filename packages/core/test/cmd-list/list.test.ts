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
