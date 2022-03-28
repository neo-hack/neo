import { execNeo, readLockFile, clearLockFile, storeDir } from '../helpers'

afterEach(() => {
  clearLockFile()
})

it('load template from github should work', async () => {
  const url = 'https://github.com/neo-hack/actions-template'
  await execNeo(['add', url, '--store-dir', storeDir])
  expect(readLockFile()).toMatchSnapshot()
})
