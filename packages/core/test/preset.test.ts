// import execa from 'execa'
import nock from 'nock'
import tempy from 'tempy'
// import { REGISTRY_MOCK_PORT } from '@pnpm/registry-mock'
import path from 'path'

import { r } from '../src/utils'
import { NPM_REGISTRY } from '../lib/utils/constants'
import { preset } from '../lib/preset'

// const cli = r('lib/neo.js')
// const registry = `http://localhost:${REGISTRY_MOCK_PORT}`
const storeDir = path.join(tempy.directory(), '.store')

// describe('command preset', () => {
//   it('load preset npm package', async () => {
//     const { stdout } = await execa('node', [cli].concat(['preset', '@aiou/preset-neo']))
//     nock(registry)
//       .get('/@aiou/ts-lib-template/-/ts-lib-template-0.5.0.tgz')
//       .replyWithFile(200, r('test/assets/ts-lib-template-0.5.0.tgz'))
//     console.log(stdout)
//   })
// })

describe('handler preset', () => {
  it('load preset package', async () => {
    nock(NPM_REGISTRY)
      .get('/@aiou/ts-lib-template/-/ts-lib-template-0.5.0.tgz')
      .replyWithFile(200, r('test/assets/ts-lib-template-0.5.0.tgz'))
    await preset({ alias: '@aiou/ts-lib-template', pref: '0.5.0', storeDir })
  }, 10000)
})
