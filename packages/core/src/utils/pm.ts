import createStore, { PackageFilesResponse } from '@pnpm/package-store'
import createClient from '@pnpm/client'
import path from 'path'

import { CommonOptions } from '../interface'
import { STORE_PATH, NPM_REGISTRY } from './constants'

const authConfig = { registry: NPM_REGISTRY }

let pm: ReturnType<typeof createTemplatePM>

const createTemplatePM = async ({ storeDir = STORE_PATH }: CommonOptions) => {
  // @ts-ignore
  const { resolve, fetchers } = createClient.default({
    authConfig,
    cacheDir: path.join(STORE_PATH, '.cache'),
  })
  // @ts-ignore
  const storeController = await createStore.default(resolve, fetchers, {
    storeDir,
    verifyStoreIntegrity: true,
  })
  return {
    async request(alias: string, pref?: string) {
      const fetchResponse = await storeController.requestPackage(
        {
          alias,
          pref,
        },
        {
          downloadPriority: 0,
          lockfileDir: storeDir,
          preferredVersions: {},
          projectDir: storeDir,
          registry: NPM_REGISTRY,
          sideEffectsCache: false,
        },
      )
      return fetchResponse
    },
    async fetch() {
      // const pkgId = 'registry.npmjs.org/is-positive/1.0.0'
      const pkgId = 'registry.npmjs.org/ts-lib-template@latest'
      const fetchResponse = storeController.fetchPackage({
        force: false,
        lockfileDir: storeDir,
        pkg: {
          id: pkgId,
          resolution: {
            // integrity: 'sha1-iACYVrZKLx632LsBeUGEJK4EUss=',
            // registry: 'https://registry.npmjs.org/',
            // tarball: 'https://registry.npmjs.org/is-positive/-/is-positive-1.0.0.tgz',
            tarball: 'https://registry.npmjs.org/@aiou/ts-lib-template/-/ts-lib-template-0.5.0.tgz',
          },
        },
      })
      return fetchResponse
    },
    async import(to: string, response: PackageFilesResponse) {
      return storeController.importPackage(to, {
        filesResponse: response,
        force: false,
      })
    },
  }
}

const create = (params: CommonOptions) => {
  if (pm) {
    return pm
  }
  return createTemplatePM(params)
}

export default create
