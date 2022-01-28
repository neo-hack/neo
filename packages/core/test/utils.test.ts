import { isMonorepo, isMatchPreset, isYaml, makeUniqId } from '../src/utils'
import { findPrefPackageByPk, parseWantedPackage } from '../src/utils/find-pref-package'

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

describe('parse wanted pkg', () => {
  it('default', () => {
    console.log(parseWantedPackage('https://github.com/pnpm/pnpm'))
  })
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
      name: 'ts-lib-template',
      pref: 'https://github.com/egoist/ts-lib-starter',
      version: '0.0.0',
      id: '1',
    },
    {
      name: 'bin-template#bundle',
      pref: '@aiou/bin-template',
      version: '1.x',
      id: '1',
    },
    {
      name: 'bin-template#unbundle',
      pref: '@aiou/bin-template@2.x',
      version: '2.x',
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
  it('find https in packages store', () => {
    const item = findPrefPackageByPk(packages, { input: 'ts-lib-template' })
    expect(item).toMatchObject({
      name: 'ts-lib-template',
      pref: 'https://github.com/egoist/ts-lib-starter',
      version: '0.0.0',
      id: '1',
      alias: 'https://github.com/egoist/ts-lib-starter',
    })
  })
  it('parse', () => {
    const item = findPrefPackageByPk(packages, { input: 'bin-template#unbundle' })
    expect(item).toMatchObject({
      name: 'bin-template#unbundle',
      pref: '@aiou/bin-template@2.x',
      version: '2.x',
      id: '1',
      alias: '@aiou/bin-template',
    })
  })
  it('find pkg in packages store by input', () => {
    const item = findPrefPackageByPk(packages, { input: 'bin-template' })
    expect(item).toMatchObject({
      name: 'bin-template',
      pref: '@aiou/bin-template',
      version: '1.x',
      id: '1',
      alias: '@aiou/bin-template',
    })
  })
  it('find pkg packages store by pkg@version', () => {
    const item = findPrefPackageByPk(packages, { input: '@aiou/react-template@2.x' })
    expect(item).toMatchObject({
      name: '@aiou/react-template',
      pref: '@aiou/react-template',
      version: '2.x',
      alias: '@aiou/react-template',
    })
  })
})
