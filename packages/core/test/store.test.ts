import tempy from 'tempy'
import path from 'path'

import { execNeo } from './helpers'
import createStore from '../lib/store'

const storeDir = path.join(tempy.directory(), '.store')

beforeAll(async () => {
  const url = 'https://github.com/spring-catponents/actions-template'
  await execNeo(['add', url, '--store-dir', storeDir])
}, 30000)

describe('pm', () => {
  it('import template from local', async () => {
    const store = await createStore({ storeDir })
    const response = await store.addTemplate({ alias: 'github:spring-catponents/actions-template' })
    const { fromStore } = await response.files?.()
    expect(fromStore).toBe(true)
  }, 30000)
})
