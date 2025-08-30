import createStore from '../src/store'
import { createTemplatePM } from '../src/store/pm'
import {
  clearLockFile,
  randomStoreDir,
  readLockFile,
  storeDir as defaultStoreDir,
} from './helpers'

describe('pm', () => {
  afterEach(() => {
    clearLockFile()
  })
  it.todo('import github:neo-hack/actions-template should from store')
  it('request should work', async () => {
    const pm = await createTemplatePM({ storeDir: defaultStoreDir })
    const response = await pm.request({ alias: '@aiou/ts-lib-template' })
    expect(response).toBeDefined()
  })
  it('request with version should work', async () => {
    const pm = await createTemplatePM({ storeDir: defaultStoreDir })
    const response = await pm.request({ pref: '@aiou/bin-template@2.1.1' })
    expect(response.body.manifest?.version).toBe('2.1.1')
  })
})

describe('store', () => {
  // FIXME: latest option not working, will always install latest
  it('add template', async () => {
    const storeDir = randomStoreDir()
    const store = await createStore({ storeDir })
    await store.addTemplate({
      alias: '@aiou/bin-template',
      latest: true,
      name: 'bin',
      pref: '@aiou/bin-template',
    })
    expect(readLockFile(storeDir)).toMatchSnapshot()
  })
  it('add preset #debug', async () => {
    const storeDir = randomStoreDir()
    const store = await createStore({ storeDir })
    await store.addPreset({
      alias: '@aiou/preset-aiou',
      latest: true,
      name: 'aiou',
      pref: '@aiou/preset-aiou',
    })
    expect(readLockFile(storeDir)).toMatchSnapshot()
  })
  it('add(type=preset)', async () => {
    const storeDir = randomStoreDir()
    const store = await createStore({ storeDir })
    await store.add({
      type: 'preset',
      pref: '@aiou/preset-aiou',
    })
    expect(readLockFile(storeDir)).toMatchSnapshot()
  })
  it('add(type=template)', async () => {
    const storeDir = randomStoreDir()
    const store = await createStore({ storeDir })
    await store.add({
      type: 'template',
      pref: '@aiou/bin-template@3.0.1',
    })
    expect(readLockFile(storeDir)).toMatchSnapshot()
  })
})
