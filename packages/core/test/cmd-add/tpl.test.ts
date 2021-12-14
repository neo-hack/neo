import tempy from 'tempy'
import path from 'path'

import { execNeo } from '../helpers'
import createStore from '../../lib/store'

describe('load template', () => {
  it('load template from github should work', async () => {
    const storeDir = path.join(tempy.directory(), '.store')
    const url = 'https://github.com/spring-catponents/actions-template'
    await execNeo(['add', url, '--store-dir', storeDir])
    const store = await createStore({ storeDir })
    expect(await store.lockFile.read()).toMatchSnapshot()
  }, 30000)
  it('load template from npm should work', async () => {
    const storeDir = path.join(tempy.directory(), '.store')
    await execNeo(['add', '@aiou/ts-lib-template', '--store-dir', storeDir])
    const store = await createStore({ storeDir })
    expect(await store.lockFile.read()).toMatchSnapshot()
  }, 10000)
})
