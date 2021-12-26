/* eslint-disable import/no-extraneous-dependencies */
import { r } from '../../src/utils'
import createLockFile from '../../src/store/lock-file'

import tempy from 'tempy'
import path from 'path'

import execa, { CommonOptions } from 'execa'
const cli = r('lib/neo.js')
export const storeDir = path.join(tempy.directory(), '.store')

export const execNeo = (args: any[], options?: CommonOptions<any>) =>
  execa('node', [cli].concat(args || []), options)

export const mockLockFile = async () => {
  const lockFile = createLockFile({ storeDir })
  await lockFile.updatePreset({
    neo: {
      templates: [
        {
          name: '@aiou/ts-lib-template',
        },
        {
          name: 'ts-lib-template',
          pref: 'https://github.com/egoist/ts-lib-starter',
        },
      ],
    },
  })
  return lockFile
}
