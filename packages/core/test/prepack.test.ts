import execa from 'execa'
import path from 'path'
import { compare } from 'comparedir-test'
import { r } from '../src/utils'
const cli = r('lib/neo.js')

describe('command prepack', () => {
  it('prepack ci part should work', async () => {
    await execa.node(cli, ['prepack', '--module', 'ci'], {
      cwd: path.resolve(r('test/fixtures/prepack-ci/output')),
    })
    await compare(r('test/fixtures/prepack-ci/output'), r('test/fixtures/prepack-ci/expected'))
  })
  it('prepack issue part should work', async () => {
    await execa.node(cli, ['prepack', '--module', 'issue'], {
      cwd: path.resolve(r('test/fixtures/prepack-issue/output')),
    })
    await compare(
      r('test/fixtures/prepack-issue/output'),
      r('test/fixtures/prepack-issue/expected'),
    )
  })
  it('prepack pr part should work', async () => {
    await execa.node(cli, ['prepack', '--module', 'pr'], {
      cwd: path.resolve(r('test/fixtures/prepack-pr/output')),
    })
    await compare(r('test/fixtures/prepack-pr/output'), r('test/fixtures/prepack-pr/expected'))
  })
  it('prepack lint part should work', async () => {
    await execa.node(cli, ['prepack', '--module', 'lint'], {
      cwd: r('test/fixtures/prepack-lint/output'),
    })
    await compare(r('test/fixtures/prepack-lint/output'), r('test/fixtures/prepack-lint/expected'))
  })
  it('prepack husky part should work', async () => {
    await execa.node(cli, ['prepack', '--module', 'husky'], {
      cwd: path.resolve(r('test/fixtures/prepack-husky/output')),
    })
    await compare(
      r('test/fixtures/prepack-husky/output'),
      r('test/fixtures/prepack-husky/expected'),
    )
  })
  it('prepack should work', async () => {
    await execa.node(cli, ['prepack'], {
      cwd: r('test/fixtures/prepack/output'),
    })
    await compare(r('test/fixtures/prepack/output'), r('test/fixtures/prepack/expected'))
  })
})
