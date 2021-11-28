import createStore, { PackageFilesResponse } from '@pnpm/package-store'
import createClient from '@pnpm/client'
import path from 'path'
import { STORE_PATH, NPM_REGISTRY } from './constants'

const authConfig = { registry: NPM_REGISTRY }
console.log(createClient)

export type TemplatePackageManagerClient = {
  request(alias: string, pref?: string): Promise<any>
  fetch(): Promise<any>
  import(to: string, response: PackageFilesResponse): Promise<any>
}

const createTemplatePM = async ({ storeDir = STORE_PATH }: { storeDir: string }) => {
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
  const pm: TemplatePackageManagerClient = {
    async request(alias: string, pref?: string) {
      console.log(storeDir)
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
  return pm
}

export default createTemplatePM
