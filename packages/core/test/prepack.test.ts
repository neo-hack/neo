import execa from 'execa'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { compare } from 'comparedir-test/lib/index'
const __dirname = dirname(fileURLToPath(import.meta.url))
const cli = path.resolve(__dirname, '../lib/neo.js')

describe('command prepack', () => {
  it('prepack ci part should work', async () => {
    await execa.node(cli, ['prepack', '--module', 'ci'], {
      cwd: path.resolve(__dirname, './fixtures/prepack-ci/output'),
    })
    await compare(
      path.resolve(__dirname, './fixtures/prepack-ci/output'),
      path.resolve(__dirname, './fixtures/prepack-ci/expected'),
    )
  })
  it('prepack lint part should work', async () => {
    await execa.node(cli, ['prepack', '--module', 'lint'], {
      cwd: path.resolve(__dirname, './fixtures/prepack-lint/output'),
    })
    await compare(
      path.resolve(__dirname, './fixtures/prepack-lint/output'),
      path.resolve(__dirname, './fixtures/prepack-lint/expected'),
    )
  })
  it('prepack should work', async () => {
    await execa.node(cli, ['prepack'], {
      cwd: path.resolve(__dirname, './fixtures/prepack/output'),
    })
    await compare(
      path.resolve(__dirname, './fixtures/prepack/output'),
      path.resolve(__dirname, './fixtures/prepack/expected'),
    )
  })
})
