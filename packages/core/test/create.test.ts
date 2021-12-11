import path from 'path'
import fs from 'fs-extra'

import { r } from '../src/utils'
import { execNeo } from './helpers'

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

describe('command create download npm package', () => {
  it('create project from npm', async () => {
    ensureDir('neo-cli-app')
    await execNeo(['create', 'bin-template', 'neo-cli-app'], {
      cwd: path.resolve(fixture('neo-cli-app')),
    })
    expect(fs.existsSync(fixture('neo-cli-app/neo-cli-app/README.md'))).toBe(true)
    clearDir('neo-cli-app')
  }, 10000)

  it.todo('create package will update lock file')
})
