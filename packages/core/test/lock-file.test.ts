import path from 'node:path'

import tempy from 'tempy'

import createLockFile from '../src/store/lock-file'
import { mockLockFile } from './helpers'

const storeDir = path.join(tempy.directory(), '.store')

const lockFile = createLockFile({ storeDir })

describe('write lock file', () => {
  it('update preset should work', async () => {
    await lockFile.updatePreset({
      neo: {
        templates: [
          {
            name: '@aiou/bin-template',
          },
        ],
      },
    })
    expect(await lockFile.read()).toMatchSnapshot()
  })
  it('update templates should work', async () => {
    await lockFile.updateTemplates({
      '/@aiou/ts-lib-template/0.5.0': {
        name: '@aiou/ts-lib-template',
      },
    })
    expect(await lockFile.read()).toMatchSnapshot()
  })
})

it('read non exit lockfile should return empty', async () => {
  expect(await lockFile.read()).toMatchObject({})
})

describe('read lock file', () => {
  let complexLockFile: any
  beforeAll(async () => {
    const { lockFile } = await mockLockFile()
    complexLockFile = lockFile
  })
  it('read templates should work', async () => {
    const tpls = await complexLockFile.readTemplates()
    expect(tpls).toMatchSnapshot()
  })
  it('should contain latest version template', async () => {
    const tpls: any[] = await complexLockFile.readTemplates()
    const rts = tpls.find(tpl => tpl.name === 'bin-template#unbundle')
    expect(rts.version).toBe('2.10.0')
  })
  it('read with preset filter should work', async () => {
    const tpls = await complexLockFile.readTemplates({ presetNames: ['neo'] })
    expect(tpls).toMatchSnapshot()
  })
})
