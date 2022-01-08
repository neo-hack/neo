import { execNeo, readLockFile, clearLockFile, storeDir } from '../helpers'

afterEach(() => {
  clearLockFile()
})

describe('load template', () => {
  it('load template from github should work', async () => {
    const url = 'https://github.com/neo-hack/actions-template'
    await execNeo(['add', url, '--store-dir', storeDir])
    expect(readLockFile()).toMatchSnapshot()
  }, 30000)
  it('load template from npm should work', async () => {
    await execNeo(['add', '@aiou/ts-lib-template', '--store-dir', storeDir])
    expect(readLockFile()).toMatchSnapshot()
  }, 10000)
})
