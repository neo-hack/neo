import path from 'path'
import tempy from 'tempy'
import fs from 'fs-extra'

import { execNeo } from '../helpers'

const storeDir = path.join(tempy.directory(), '.store')

// fix: https://github.com/neo-hack/neo/issues/285
it('create project log dest name', async () => {
  const destDir = tempy.directory()
  const { stdout } = await execNeo(
    ['create', '@aiou/bin-template', 'target', '--store-dir', storeDir],
    {
      cwd: destDir,
    },
  )
  expect(stdout.includes('target create')).toBe(true)
})

// fix: https://github.com/neo-hack/neo/issues/343
describe('fix issue #343', () => {
  const destDir = tempy.directory()
  beforeAll(async () => {
    await execNeo(
      ['create', '@aiou/bin-template', 'target', '--store-dir', storeDir],
      {
        cwd: destDir,
      },
    )
  })
  it('created project should not contain readme field in package.json', async () => {
    const pkg = fs.readJSONSync(path.join(destDir, 'target', 'package.json'))
    expect(pkg.readme).not.toBeDefined()
  })
})
