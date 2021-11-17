import { isMonorepo } from '../src/utils'

it('is monorepo', async () => {
  expect(await isMonorepo()).toBeDefined()
})
