/* eslint-disable import/no-extraneous-dependencies */
import { randomUUID } from 'node:crypto'
import path from 'node:path'

import { execa } from 'execa'
import fs from 'fs-extra'

import createLockFile from '../../src/store/lock-file'
import { r } from '../../src/utils'
import { LOCK_FILE } from '../../src/utils/constants'

import type { CommonOptions } from 'execa'

const cli = r('bin/index.mjs')
const root = path.resolve(__dirname, '..', '..')
export const storeDir = path.join(root, '.store')
export const destDir = path.join(root, '.dest')

export const execNeo = (args: any[], options: CommonOptions<any> = {}) =>
  execa('node', [cli].concat(args || []), options)

export const readLockFile = () => {
  if (!fs.existsSync(path.join(storeDir, LOCK_FILE))) {
    console.log('lock file not found', path.join(storeDir, LOCK_FILE))
    return ''
  }
  return fs.readFileSync(path.join(storeDir, LOCK_FILE)).toString()
}

export const clearLockFile = () => {
  return fs.removeSync(path.join(storeDir, LOCK_FILE))
}

export const mockLockFile = async () => {
  const storeDir = path.join(root, '.store', randomUUID())
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
        id: 'id',
        pref: '@aiou/bin-template@2.x',
      },
      id3: {
        name: 'bin-template#unbundle',
        version: '2.10.0',
        id: 'id3',
        pref: '@aiou/bin-template@2.x',
      },
      id2: {
        name: 'bin-template#bundle',
        version: '1.0.0',
        id: 'id2',
        pref: '@aiou/bin-template',
      },
      id4: {
        name: 'react-template',
        version: '1.0.0',
        id: 'id4',
        pref: '@aiou/react-template',
      },
    },
  })
  return { lockFile, storeDir }
}
