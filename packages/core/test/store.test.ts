import tempy from 'tempy'
import path from 'path'

import { execNeo } from './helpers'

const storeDir = path.join(tempy.directory(), '.store')

beforeAll(async () => {
  const url = 'https://github.com/spring-catponents/actions-template'
  await execNeo(['add', url, '--store-dir', storeDir])
}, 30000)

describe('pm', () => {
  it.todo('import github:spring-catponents/actions-template should from store')
})
