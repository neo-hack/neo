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
    const { stdout } = await execNeo(
      ['run', '@aiou/generator-aiou@0.2.1', '--store-dir', storeDir],
      { cwd: __dirname },
    )
    expect(stdout).toMatchSnapshot()
  })
})
