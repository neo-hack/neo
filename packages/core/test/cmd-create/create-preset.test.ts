import { execNeo, mockLockFile, storeDir } from '../helpers'

import tempy from 'tempy'
import fs from 'fs-extra'
import path from 'path'

beforeAll(async () => {
  await mockLockFile()
})

describe('create from preset', () => {
  it('create from preset by pref url should work', async () => {
    const destDir = tempy.directory()
    await execNeo(['create', 'ts-lib-template', 'target', '--store-dir', storeDir], {
      cwd: destDir,
    })
    expect(fs.existsSync(path.join(destDir, './target/README.md'))).toBe(true)
  })

  it('create from preset by npm package name should work', async () => {
    const destDir = tempy.directory()
    await execNeo(['create', '@aiou/ts-lib-template', 'target', '--store-dir', storeDir], {
      cwd: destDir,
    })
    expect(fs.existsSync(path.join(destDir, './target/README.md'))).toBe(true)
  })
})
