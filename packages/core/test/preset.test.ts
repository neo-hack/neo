import execa from 'execa'
// import nock from 'nock'
import tempy from 'tempy'
// import { REGISTRY_MOCK_PORT } from '@pnpm/registry-mock'
import path from 'path'
// import axios from 'axios'

import { r } from '../src/utils'
// import meta from './assets/ts-lib-template-0.5.0.json'
// import { NPM_REGISTRY } from '../src/utils/constants'
// import createTemplatePM from '../src/utils/pm'
// import { preset } from '../lib/preset'

const cli = r('lib/neo.js')
// const registry = `http://localhost:${REGISTRY_MOCK_PORT}`
const storeDir = path.join(tempy.directory(), '.store')

describe('command preset', () => {
  it('load preset npm package', async () => {
    const { stdout, stderr } = await execa(
      'node',
      [cli].concat(['preset', '@aiou/preset-aiou', '--store-dir', storeDir]),
    )
    // nock(registry)
    //   .get('/@aiou/ts-lib-template/-/ts-lib-template-0.5.0.tgz')
    //   .replyWithFile(200, r('test/assets/ts-lib-template-0.5.0.tgz'))
    console.log(stdout, stderr)
    expect(stdout).toBeDefined()
    expect(stderr).toBe('')
  })
})

// describe('handler preset', () => {
//   it('load preset package', async () => {
//     // nock(NPM_REGISTRY)
//     //   .get('/@aiou/ts-lib-template/-/ts-lib-template-0.5.0.tgz')
//     //   .replyWithFile(200, r('test/assets/ts-lib-template-0.5.0.tgz'))
//     // nock(NPM_REGISTRY).get('/@aiou%2Fts-lib-template').reply(200, meta)
//     const res = await axios.get(`https://registry.npmjs.org/@aiou%2Fts-lib-template`)
//     const pm = await createTemplatePM({ storeDir })
//     const pmRes = await pm.request('@aiou/ts-lib-template')
//     // console.log(await res.files?.())
//     console.log(await pmRes.files())
//     expect(res).toBeDefined()
//     // await preset({ alias: '@aiou/ts-lib-template', pref: '0.5.0', storeDir })
//   }, 20000)
// })
