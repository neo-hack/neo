import tempy from 'tempy'
import path from 'path'

import { execNeo } from '../helpers'
import createStore from '../../lib/store'

const storeDir = path.join(tempy.directory(), '.store')

describe('load preset', () => {
  it('load preset from npm package should work', async () => {
    await execNeo(['add', '@aiou/preset-aiou', '--store-dir', storeDir, '--preset'])
    const store = await createStore({ storeDir })
    expect(await store.lockFile.read()).toMatchSnapshot()
  }, 10000)
})
