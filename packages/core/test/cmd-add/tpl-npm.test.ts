import {
  execNeo,
  randomStoreDir,
  readLockFile,
} from '../helpers'

const storeDir: string = randomStoreDir()

it('load template from npm should work', async () => {
  await execNeo(['add', '@aiou/ts-lib-template', '--store-dir', storeDir], {
    env: {
      DEBUG: 'neo:*',
    },
    stderr: 'inherit',
    stdout: 'inherit',
  })
  expect(readLockFile(storeDir)).toMatchSnapshot()
}, 10000)
