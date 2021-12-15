import nock from 'nock'
import fs from 'fs-extra'
import tempy from 'tempy'
import path from 'path'

import { r } from '../lib/utils/index.js'
import { NPM_REGISTRY } from '../lib/utils/constants.js'
import createTemplatePM from '../lib/utils/pm.js'

const storeDir = path.join(tempy.directory(), '.store')

export const mock = async () => {
  const pm = await createTemplatePM({ storeDir })
  nock(NPM_REGISTRY)
    .get('/@aiou/ts-lib-template/-/ts-lib-template-0.5.0.tgz')
    .replyWithFile(200, r('test/assets/ts-lib-template-0.5.0.tgz'))
  nock(NPM_REGISTRY).get('/@aiou%2Fts-lib-template').reply(200, fs.readJSONSync(r('test/assets/ts-lib-template-0.5.0.json')))
  const response = await pm.request('@aiou/ts-lib-template')
  const files = await response.files()
  console.log(files)
}

mock()
