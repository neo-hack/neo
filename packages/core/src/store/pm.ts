import createStore, { PackageFilesResponse, PackageResponse } from '@pnpm/package-store'
import createClient from '@pnpm/client'
import path from 'path'

import { CommonOptions } from '../interface'
import { STORE_PATH, NPM_REGISTRY, CACHE_DIRNAME } from '../utils/constants'
import { debugLogger } from '../utils/logger'

const authConfig = { registry: NPM_REGISTRY }
export type RequestOptions = {
  alias?: string
  pref?: string
}

let pm: ReturnType<typeof createTemplatePM>

export const createTemplatePM = async ({ storeDir = STORE_PATH }: CommonOptions) => {
  // @ts-ignore
  const { resolve, fetchers } = createClient.default({
    authConfig,
    cacheDir: path.join(STORE_PATH, CACHE_DIRNAME),
  })
  // @ts-ignore
  const storeController = await createStore.default(resolve, fetchers, {
    storeDir,
    verifyStoreIntegrity: true,
  })
  return {
    async fetch({ alias, pref }: RequestOptions): Promise<PackageResponse> {
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
    async request({ alias, pref }: RequestOptions): Promise<PackageResponse> {
      let fetchResponse = await this.fetch({ alias, pref }).catch((e) => {
        debugLogger.pm(`request %s with %s ${e}`, alias, pref)
        return undefined
      })
      if (!fetchResponse) {
        fetchResponse = await this.fetch({ pref: alias })
      }
      debugLogger.pm('request response.body %O', fetchResponse.body)
      return fetchResponse
    },
    async import(to: string, response?: PackageFilesResponse) {
      if (!response) {
        return
      }
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
