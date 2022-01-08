import { execNeo, readLockFile, clearLockFile, storeDir } from '../helpers'

afterEach(() => {
  clearLockFile()
})

it('load template from npm should work', async () => {
  await execNeo(['add', '@aiou/ts-lib-template', '--store-dir', storeDir])
  expect(readLockFile()).toMatchSnapshot()
}, 10000)
