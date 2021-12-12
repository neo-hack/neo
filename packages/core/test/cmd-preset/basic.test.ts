import tempy from 'tempy'
import path from 'path'
import debug from 'debug'

import { execNeo } from '../helpers'

const storeDir = path.join(tempy.directory(), '.store')
debug.enable('neo:lockfile*')

describe('load from npm', () => {
  it('load preset npm package should work', async () => {
    const { stdout } = await execNeo(['preset', '@aiou/preset-aiou', '--store-dir', storeDir])
    expect(stdout).toMatchSnapshot()
  })
})

describe('load from github', () => {
  it('load default branch should work', async () => {
    const url = 'https://github.com/spring-catponents/actions-template'
    const { stdout } = await execNeo(['preset', url, '--store-dir', storeDir])
    expect(stdout).toMatchSnapshot()
  })
})
