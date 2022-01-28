import { isMonorepo, isMatchPreset, isYaml, makeUniqId } from '../src/utils'
import { findPerfPackageByPk } from '../src/utils/find-pref-package'

it('is monorepo', async () => {
  expect(await isMonorepo()).toBeDefined()
})

it('is match preset', async () => {
  expect(isMatchPreset('@aiou/preset-aiou', ['@aiou/*'])).toBe(true)
  expect(isMatchPreset('@aiou/preset-aiou', ['@aiou'])).toBe(false)
  expect(isMatchPreset('@aiou/preset-aiou', ['@aiou/preset-aiou'])).toBe(true)
})

it('is yaml', async () => {
  expect(isYaml('file.yaml')).toBe(true)
  expect(isYaml('file.yml')).toBe(true)
})

it('make uniq id', () => {
  expect(makeUniqId({ pref: 'template', name: 'bin' })).toBe('bin (template)')
})

describe('find perf package by uniq pk name', () => {
  const packages = [
    {
      name: 'bin-template',
      pref: '@aiou/bin-template',
      version: '1.x',
      id: '1',
    },
    {
      name: 'bin-template#bundle',
      pref: '@aiou/bin-template',
      version: '1.x',
      id: '1',
    },
    {
      name: '@aiou/react-template',
      pref: '@aiou/react-template',
      version: '1.x',
      id: '2',
    },
    {
      name: '@aiou/bin-template',
      pref: '@aiou/bin-template',
      version: '1.x',
      id: '3',
    },
    {
      name: '@aiou/webext-template',
      pref: '@aiou/webext-template',
      version: '2.x',
      id: '4',
    },
  ]
  it.todo('find https in packages store')
  it('find pkg in packages store by input', () => {
    const item = findPerfPackageByPk(packages, { input: 'bin-template' })
    expect(item).toMatchObject({
      name: 'bin-template',
      pref: '@aiou/bin-template',
      version: '1.x',
      id: '1',
      alias: '@aiou/bin-template',
    })
  })
  it('find pkg packages store by pkg@version', () => {
    const item = findPerfPackageByPk(packages, { input: '@aiou/react-template@2.x' })
    expect(item).toMatchObject({
      name: '@aiou/react-template',
      pref: '@aiou/react-template',
      version: '2.x',
      alias: '@aiou/react-template',
    })
  })
})
