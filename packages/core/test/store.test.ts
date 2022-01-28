import tempy from 'tempy'
import path from 'path'

import { createTemplatePM } from '../src/store/pm'

const storeDir = path.join(tempy.directory(), '.store')

describe('pm', () => {
  it.todo('import github:neo-hack/actions-template should from store')
  it('request should work', async () => {
    const pm = await createTemplatePM({ storeDir })
    const response = await pm.request({ alias: '@aiou/ts-lib-template' })
    expect(response).toBeDefined()
  })
  it('request with version should work', async () => {
    const pm = await createTemplatePM({ storeDir })
    const response = await pm.request({ alias: '@aiou/bin-template', pref: '2.1.1' })
    expect(response.body.manifest?.version).toBe('2.1.1')
  })
})
