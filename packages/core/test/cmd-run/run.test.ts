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
    expect(r('test/fixtures/prepack/output')).toMatchDir(
      r('test/fixtures/prepack/expected'),
    )
  })

  it('run ci part should work', async () => {
    fs.removeSync(r('test/fixtures/prepack-ci/output/.github'))
    await execNeo(['run', '@aiou/generator-pnpm-ci', '--module', 'workflows'], {
      cwd: path.resolve(r('test/fixtures/prepack-ci/output')),
    })
    expect(r('test/fixtures/prepack-ci/output')).toMatchDir(r('test/fixtures/prepack-ci/expected'))
  })
})
