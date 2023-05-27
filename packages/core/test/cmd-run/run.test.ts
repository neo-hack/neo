import path from 'node:path'

import fs from 'fs-extra'

import { r } from '../../src/utils'
import {
  execNeo,
  mockLockFile,
  storeDir,
} from '../helpers'

beforeAll(async () => {
  await mockLockFile()
})

describe('command run', () => {
  it('run mario with version', async () => {
    await execNeo(
      ['run', '@aiou/generator-pnpm-ci@2.1.1', '--store-dir', storeDir],
      { cwd: path.resolve(r('test/fixtures/prepack/output')) },
    )
    // FIXME: there is bug in toMatchDir(always pass true)
    expect(r('test/fixtures/prepack/output')).toMatchDir(
      r('test/fixtures/prepack/expected'),
    )
  })

  it('run ci part should work', async () => {
    fs.removeSync(r('test/fixtures/prepack-ci/output/.github'))
    await execNeo(['run', '@aiou/generator-pnpm-ci', '--module', 'CI'], {
      cwd: path.resolve(r('test/fixtures/prepack-ci/output')),
    })
    // expect(r('test/fixtures/prepack-ci/output')).toMatchDir(r('test/fixtures/prepack-ci/expected'))
  })
  it('run issue part should work', async () => {
    fs.removeSync(r('test/fixtures/prepack-issue/output/.github'))
    await execNeo(['run', '@aiou/generator-pnpm-ci', '--module', 'Issue template'], {
      cwd: path.resolve(r('test/fixtures/prepack-issue/output')),
    })
    expect(r('test/fixtures/prepack-issue/output')).toMatchDir(
      r('test/fixtures/prepack-issue/expected'),
    )
  })
  it('run pr part should work', async () => {
    fs.removeSync(r('test/fixtures/prepack-pr/output/.github'))
    await execNeo(['run', '@aiou/generator-pnpm-ci', '--module', 'PR template'], {
      cwd: path.resolve(r('test/fixtures/prepack-pr/output')),
    })
    expect(r('test/fixtures/prepack-pr/output')).toMatchDir(r('test/fixtures/prepack-pr/expected'))
  })
})
