import { isMonorepo, isMatchPreset, isOffline } from '../src/utils'

it('is monorepo', async () => {
  expect(await isMonorepo()).toBeDefined()
})

it('is match preset', async () => {
  expect(isMatchPreset('@aiou/preset-aiou', ['@aiou/*'])).toBe(true)
  expect(isMatchPreset('@aiou/preset-aiou', ['@aiou'])).toBe(false)
  expect(isMatchPreset('@aiou/preset-aiou', ['@aiou/preset-aiou'])).toBe(true)
})

it('is offline', async () => {
  expect(await isOffline()).toBe(false)
})
