import {
  execNeo,
  mockLockFile,
  readLockFile,
  storeDir as defaultStoreDir,
} from '../helpers'

let storeDir: string = defaultStoreDir
beforeAll(async () => {
  const { storeDir: mockedStoreDir } = await mockLockFile()
  storeDir = mockedStoreDir
})

it('load template from npm should work', async () => {
  await execNeo(['add', '@aiou/ts-lib-template', '--store-dir', storeDir])
  expect(readLockFile(storeDir)).toMatchSnapshot()
}, 10000)
