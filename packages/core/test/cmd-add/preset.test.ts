import {
  clearLockFile,
  execNeo,
  readLockFile,
  storeDir,
} from '../helpers'

afterEach(() => {
  clearLockFile()
})

describe('load preset', () => {
  it('load preset from npm package should work', async () => {
    await execNeo(['add', '@aiou/preset-aiou', '--store-dir', storeDir, '--preset'], {
      env: {
        DEBUG: 'neo:*',
      },
    })
    console.log('readLockFilereadLockFile()', readLockFile())
    expect(readLockFile()).toMatchSnapshot()
  }, 10000)
})
