import path from 'path'
import fs from 'fs-extra'
import tempy from 'tempy'

import { execNeo } from '../helpers'

const storeDir = path.join(tempy.directory(), '.store')

describe('command create', () => {
  it('create on empty store', async () => {
    const destDir = tempy.directory()
    const { stdout } = await execNeo(['create', '--store-dir', storeDir], {
      cwd: destDir,
    })
    expect(stdout).toMatchSnapshot()
  }, 30000)

  it('create project from npm', async () => {
    const destDir = tempy.directory()
    await execNeo(['create', '@aiou/bin-template', 'target', '--store-dir', storeDir], {
      cwd: destDir,
    })
    expect(fs.existsSync(path.join(destDir, './target/README.md'))).toBe(true)
  }, 10000)

  // it('create package from github should work', async () => {
  //   const destDir = tempy.directory()
  //   const url = 'https://github.com/neo-hack/bin-template'
  //   await execNeo(['create', url, 'target', '--store-dir', storeDir], {
  //     cwd: destDir,
  //   })
  //   expect(fs.existsSync(path.join(destDir, './target/README.md'))).toBe(true)
  // }, 30000)

  it('create project from local store in default', async () => {
    const destDir = tempy.directory()
    await execNeo(['add', '@aiou/webext-template@0.1.0', '--store-dir', storeDir], {
      cwd: destDir,
    })
    await execNeo(['create', '@aiou/webext-template', 'target', '--store-dir', storeDir], {
      cwd: destDir,
    })
    const pkg = fs.readJsonSync(path.join(destDir, './target/package.json'))
    expect(pkg.version).toBe('0.1.0')
  }, 10000)

  it('create project with latest', async () => {
    const destDir = tempy.directory()
    await execNeo(
      ['create', '@aiou/webext-template', 'target', '--store-dir', storeDir, '--latest'],
      {
        cwd: destDir,
      },
    )
    const pkg = fs.readJsonSync(path.join(destDir, './target/package.json'))
    expect(pkg.version).not.toBe('0.1.0')
  })
})

describe('command create postcreate', () => {
  it('postcreate clean up changelog file', async () => {
    const destDir = tempy.directory()
    await execNeo(['create', '@aiou/bin-template', 'target', '--store-dir', storeDir], {
      cwd: destDir,
    })
    expect(!fs.existsSync(path.join(destDir, './target/CHANGELOG.md'))).toBe(true)
  }, 10000)

  it('postcreate in monorepo clean up changelog, .eslintignore etc...', async () => {
    const destDir = tempy.directory()
    await execNeo(
      ['create', '@aiou/bin-template', 'target', '--store-dir', storeDir, '--mono', true],
      {
        cwd: destDir,
      },
    )
    const mono = ['.eslintignore', '.eslintrc', '.changeset', '.github', '.husky']
    const checkresult = mono.map((file) => !fs.existsSync(path.join(destDir, './target', file)))
    expect(checkresult.every((v) => v)).toBe(true)
  }, 10000)
})
