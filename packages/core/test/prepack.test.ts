import path from 'path'
import fs from 'fs-extra'
import { compare } from 'comparedir-test'

import { r } from '../src/utils'
import { execNeo } from './helpers'

describe('command run', () => {
  it('run ci part should work', async () => {
    fs.removeSync(r('test/fixtures/prepack-ci/output/.github'))
    await execNeo(['run', '@aiou/generator-pnpm-ci', '--module', 'CI'], {
      cwd: path.resolve(r('test/fixtures/prepack-ci/output')),
    })
    await compare(r('test/fixtures/prepack-ci/output'), r('test/fixtures/prepack-ci/expected'))
  })
  it('run issue part should work', async () => {
    fs.removeSync(r('test/fixtures/prepack-issue/output/.github'))
    await execNeo(['run', '@aiou/generator-pnpm-ci', '--module', 'Issue template'], {
      cwd: path.resolve(r('test/fixtures/prepack-issue/output')),
    })
    await compare(
      r('test/fixtures/prepack-issue/output'),
      r('test/fixtures/prepack-issue/expected'),
    )
  })
  it('run pr part should work', async () => {
    fs.removeSync(r('test/fixtures/prepack-pr/output/.github'))
    await execNeo(['run', '@aiou/generator-pnpm-ci', '--module', 'PR template'], {
      cwd: path.resolve(r('test/fixtures/prepack-pr/output')),
    })
    await compare(r('test/fixtures/prepack-pr/output'), r('test/fixtures/prepack-pr/expected'))
  })
  // it('run lint part should work', async () => {
  //   await execNeo(['prepack', '--module', 'lint'], {
  //     cwd: r('test/fixtures/prepack-lint/output'),
  //   })
  //   await compare(r('test/fixtures/prepack-lint/output'), r('test/fixtures/prepack-lint/expected'))
  // })
  it('run husky part should work', async () => {
    await execNeo(['run', '@aiou/generator-pnpm-ci', '--module', 'Precommit'], {
      cwd: path.resolve(r('test/fixtures/prepack-husky/output')),
    })
    await compare(
      r('test/fixtures/prepack-husky/output'),
      r('test/fixtures/prepack-husky/expected'),
    )
  })
  // it('run should work', async () => {
  //   await execNeo(['run', '@aiou/generator-pnpm-ci'], {
  //     cwd: r('test/fixtures/prepack/output'),
  //   })
  //   await compare(r('test/fixtures/prepack/output'), r('test/fixtures/prepack/expected'))
  // }, 10000)
})
