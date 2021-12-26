import path from 'path'
import tempy from 'tempy'

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
}, 10000)
