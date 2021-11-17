import execa from 'execa'
import path from 'path'
import fs from 'fs-extra'

import { r } from '../src/utils'

const fixture = (pathname) => r(`test/fixtures/create/${pathname}`)
const ensureDir = (pathname) => {
  const folder = fixture(pathname)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
}
const clearDir = (pathname) => {
  fs.removeSync(fixture(pathname))
}
const cli = r('lib/neo.js')

describe('command create download npm package', () => {
  it('create project from npm', async () => {
    ensureDir('neo-cli-app')
    await execa.node(cli, ['create', 'bin-template', 'neo-cli-app'], {
      cwd: path.resolve(fixture('neo-cli-app')),
    })
    expect(fs.existsSync(fixture('neo-cli-app/neo-cli-app/README.md'))).toBe(true)
    clearDir('neo-cli-app')
  }, 10000)
})
