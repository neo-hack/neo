import { clearLockFile } from '../helpers'

afterEach(() => {
  clearLockFile()
})

it.todo('fix timeout, load template from github should work')

// it('load template from github should work', async () => {
//   const url = 'https://github.com/neo-hack/actions-template'
//   await execNeo(['add', url, '--store-dir', storeDir])
//   expect(readLockFile()).toMatchSnapshot()
// })
