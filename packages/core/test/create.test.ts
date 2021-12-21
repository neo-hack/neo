import path from 'path'
import fs from 'fs-extra'
import tempy from 'tempy'

import { execNeo } from './helpers'

const storeDir = path.join(tempy.directory(), '.store')

describe('command create', () => {
  it('create project from npm', async () => {
    const destDir = tempy.directory()
    await execNeo(['create', '@aiou/bin-template', 'target', '--store-dir', storeDir], {
      cwd: destDir,
    })
    expect(fs.existsSync(path.join(destDir, './target/README.md'))).toBe(true)
  }, 10000)

  it('create package from github should work', async () => {
    const destDir = tempy.directory()
    const url = 'https://github.com/neo-hack/bin-template'
    await execNeo(['create', url, 'target', '--store-dir', storeDir], {
      cwd: destDir,
    })
    expect(fs.existsSync(path.join(destDir, './target/README.md'))).toBe(true)
  }, 30000)
  it.todo('create template from preset')
})
