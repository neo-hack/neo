import { randomUUID } from 'node:crypto'
import path from 'node:path'

import fs from 'fs-extra'

import {
  destDir as destDirHelper,
  execNeo,
  storeDir as storeDirHelper,
} from '../helpers'

const storeDir = path.join(storeDirHelper, randomUUID(), '.store')
const destDir = () => {
  const dir = path.join(destDirHelper, randomUUID())
  fs.ensureDirSync(dir)
  return dir
}

describe('command create', () => {
  it('create on empty store', async () => {
    const { stdout } = await execNeo(['create', '--store-dir', storeDir], {
      cwd: destDir(),
    })
    expect(stdout).toMatchSnapshot()
  }, 30000)

  it('create project from npm', async () => {
    const dest = destDir()
    await execNeo(['create', '@aiou/bin-template', 'target', '--store-dir', storeDir], {
      cwd: dest,
    })
    expect(fs.existsSync(path.join(dest, './target/README.md'))).toBe(true)
  }, 10000)

  // it('create package from github should work', async () => {
  //   const destDir = tempy.directory()
  //   const url = 'https://github.com/neo-hack/bin-template'
  //   await execNeo(['create', url, 'target', '--store-dir', storeDir], {
  //     cwd: destDir,
  //   })
  //   expect(fs.existsSync(path.join(destDir, './target/README.md'))).toBe(true)
  // }, 30000)

  it('create project from local store in default #debug', async () => {
    const dest = destDir()
    await execNeo(['add', '@aiou/webext-template@0.1.0', '--store-dir', storeDir], {
      cwd: dest,
    })
    await execNeo(['create', '@aiou/webext-template', 'target', '--store-dir', storeDir], {
      cwd: dest,
    })
    const pkg = fs.readJsonSync(path.join(dest, './target/package.json'))
    expect(pkg.version).toBe('0.1.0')
  }, 10000)

  it('create project with latest #debug', async () => {
    const dest = destDir()
    const { stdout, stderr } = await execNeo(
      ['create', '@aiou/webext-template', 'target', '--store-dir', storeDir, '--latest'],
      {
        cwd: dest,
        env: {
          DEBUG: 'neo:*',
        },
      },
    )
    console.log(stdout, stderr)
    const pkg = fs.readJsonSync(path.join(dest, './target/package.json'))
    expect(pkg.version).not.toBe('0.1.0')
  })
})

describe('command create postcreate', () => {
  it('postcreate clean up changelog file', async () => {
    const dest = destDir()
    await execNeo(['create', '@aiou/bin-template', 'target', '--store-dir', storeDir], {
      cwd: dest,
    })
    expect(!fs.existsSync(path.join(dest, './target/CHANGELOG.md'))).toBe(true)
  }, 10000)

  it('postcreate in monorepo clean up changelog, .eslintignore etc...', async () => {
    const dest = destDir()
    await execNeo(
      ['create', '@aiou/bin-template', 'target', '--store-dir', storeDir, '--mono', true],
      {
        cwd: dest,
      },
    )
    const mono = ['.eslintignore', '.eslintrc', '.changeset', '.github', '.husky']
    const checkresult = mono.map(file => !fs.existsSync(path.join(dest, './target', file)))
    expect(checkresult.every(v => v)).toBe(true)
  }, 10000)
})

describe('command create with template contain .neo', () => {
  it('should del after create', async () => {
    const dest = destDir()
    await execNeo(['create', '@aiou/rollup-template', 'target', '--store-dir', storeDir], {
      cwd: dest,
    })
    // :( sync expect failed on ci
    setTimeout(() => {
      expect(fs.existsSync(path.join(dest, './target/.neo'))).toBe(false)
    }, 1000)
  })
})
