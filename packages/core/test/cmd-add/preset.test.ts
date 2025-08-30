import {
  execNeo,
  mockLockFile,
  readLockFile,
  storeDir as defaultStoreDir,
} from '../helpers'

let storeDir: string = defaultStoreDir
afterEach(async () => {
  const { storeDir: mockedStoreDir } = await mockLockFile()
  storeDir = mockedStoreDir
})

describe('load preset', () => {
  it('load preset from npm package should work', async () => {
    await execNeo(['add', '@aiou/preset-aiou', '--store-dir', storeDir, '--preset'], {
      env: {
        DEBUG: 'neo:*',
      },
    })
    expect(await readLockFile()).toMatchSnapshot()
  }, 10000)
})
