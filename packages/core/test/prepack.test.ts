import execa from 'execa'
import path from 'path'
import { compare } from 'comparedir-test/lib/index'
import { r } from '../src/utils'
const cli = r('lib/neo.js')

describe('command prepack', () => {
  it('prepack ci part should work', async () => {
    await execa.node(cli, ['prepack', '--module', 'ci'], {
      cwd: path.resolve(r('test/fixtures/prepack-ci/output')),
    })
    await compare(r('test/fixtures/prepack-ci/output'), r('test/fixtures/prepack-ci/expected'))
  })
  it('prepack lint part should work', async () => {
    await execa.node(cli, ['prepack', '--module', 'lint'], {
      cwd: r('test/fixtures/prepack-lint/output'),
    })
    await compare(r('test/fixtures/prepack-lint/output'), r('test/fixtures/prepack-lint/expected'))
  })
  it('prepack should work', async () => {
    await execa.node(cli, ['prepack'], {
      cwd: r('test/fixtures/prepack/output'),
    })
    await compare(r('test/fixtures/prepack/output'), r('test/fixtures/prepack/expected'))
  })
})
