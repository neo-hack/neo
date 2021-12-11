import createLockFile from '../src/utils/lock-file'

import path from 'path'
import tempy from 'tempy'

const storeDir = path.join(tempy.directory(), '.store')

const lockFile = createLockFile({ storeDir })

describe('lock file', () => {
  it('read non exit lockfile should return empty', async () => {
    expect(await lockFile.read()).toMatchObject({})
  })
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
  it('read templates should work', async () => {
    const tpls = await lockFile.readTemplates()
    expect(tpls).toMatchSnapshot()
  })
  it.todo('update packages should work')
})
