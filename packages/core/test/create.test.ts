import path from 'path'
import fs from 'fs-extra'
import tempy from 'tempy'

import { execNeo } from './helpers'

const storeDir = path.join(tempy.directory(), '.store')
const destDir = tempy.directory()

describe('command create download npm package', () => {
  it('create project from npm', async () => {
    await execNeo(['create', '@aiou/bin-template', 'neo-cli-app', '--store-dir', storeDir], {
      cwd: destDir,
    })
    expect(fs.existsSync(path.join(destDir, './neo-cli-app/README.md'))).toBe(true)
  }, 10000)

  it.todo('create package from github should work')
  it.todo('create package will update lock file')
})
