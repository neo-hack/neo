/* eslint-disable import/no-extraneous-dependencies */
import { r } from '../../src/utils'
import createLockFile from '../../src/store/lock-file'
import { LOCK_FILE } from '../../src/utils/constants'

import tempy from 'tempy'
import path from 'path'
import fs from 'fs-extra'

import { CommonOptions, execa } from 'execa'
const cli = r('bin/index.mjs')
export const storeDir = path.join(tempy.directory(), '.store')

export const execNeo = (args: any[], options: CommonOptions<any> = {}) =>
  execa('node', [cli].concat(args || []), options)

export const readLockFile = () => {
  return fs.readFileSync(path.join(storeDir, LOCK_FILE)).toString()
}

export const clearLockFile = () => {
  return fs.removeSync(path.join(storeDir, LOCK_FILE))
}

export const mockLockFile = async () => {
  const lockFile = createLockFile({ storeDir })
  await lockFile.write({
    presets: {
      neo: {
        configs: [
          {
            name: 'CI',
            pref: './assets/ci.yaml',
          },
        ],
        templates: [
          {
            name: '@aiou/webext-template',
          },
          {
            name: 'ts-lib-template',
            pref: '@aiou/ts-lib-template',
          },
          {
            name: 'ts-lib-template',
            pref: 'https://github.com/egoist/ts-lib-starter',
          },
          {
            name: 'bin-template#unbundle',
            pref: '@aiou/bin-template@2.x',
          },
          {
            name: 'bin-template#bundle',
            pref: '@aiou/bin-template',
          },
        ],
      },
      demo: {
        templates: [
          {
            name: 'ts-lib-template',
            pref: '@aiou/ts-lib-template',
          },
        ],
      },
    },
    templates: {
      id: {
        name: 'bin-template#unbundle',
        version: '2.9.0',
        resolvedVia: 'npm-registry',
        id: 'id',
        pref: '@aiou/bin-template@2.x',
      },
      id3: {
        name: 'bin-template#unbundle',
        version: '2.10.0',
        resolvedVia: 'npm-registry',
        id: 'id3',
        pref: '@aiou/bin-template@2.x',
      },
      id2: {
        name: 'bin-template#bundle',
        version: '1.0.0',
        resolvedVia: 'npm-registry',
        id: 'id2',
        pref: '@aiou/bin-template',
      },
      id4: {
        name: 'react-template',
        version: '1.0.0',
        resolvedVia: 'npm-registry',
        id: 'id4',
        pref: '@aiou/react-template',
      },
    },
  })
  return lockFile
}
