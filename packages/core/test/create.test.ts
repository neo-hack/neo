import path from 'path'
import fs from 'fs-extra'
import tempy from 'tempy'

import { r } from '../src/utils'
import { execNeo } from './helpers'

const storeDir = path.join(tempy.directory(), '.store')

const fixture = (pathname: string) => r(`test/fixtures/create/${pathname}`)
const ensureDir = (pathname: string) => {
  const folder = fixture(pathname)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
}
const clearDir = (pathname: string) => {
  fs.removeSync(fixture(pathname))
}

describe('command create download npm package', () => {
  it('create project from npm', async () => {
    ensureDir('neo-cli-app')
    const { stdout, stderr } = await execNeo(
      ['create', '@aiou/bin-template', 'neo-cli-app', '--store-dir', storeDir],
      { cwd: path.resolve(fixture('neo-cli-app')) },
    )
    console.log(stdout, stderr)
    expect(fs.existsSync(fixture('neo-cli-app/neo-cli-app/README.md'))).toBe(true)
    clearDir('neo-cli-app')
  }, 10000)

  it.todo('create package will update lock file')
})
