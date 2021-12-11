// import nock from 'nock'
import tempy from 'tempy'
import path from 'path'
import debug from 'debug'

import { execNeo } from '../helpers'

// const registry = `http://localhost:${REGISTRY_MOCK_PORT}`
const storeDir = path.join(tempy.directory(), '.store')
debug.enable('neo:lockfile*')

it('load preset npm package should work', async () => {
  const { stdout, stderr } = await execNeo(['preset', '@aiou/preset-aiou', '--store-dir', storeDir])
  // nock(registry)
  //   .get('/@aiou/ts-lib-template/-/ts-lib-template-0.5.0.tgz')
  //   .replyWithFile(200, r('test/assets/ts-lib-template-0.5.0.tgz'))
  expect(stdout).toMatchSnapshot()
  expect(stderr).toBe('')
})
