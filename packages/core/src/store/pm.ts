import path from 'node:path'

import createClient from '@pnpm/client'
import createStore from '@pnpm/package-store'

import {
  CACHE_DIRNAME,
  NPM_REGISTRY,
  STORE_PATH,
} from '../utils/constants'
import { debug } from '../utils/logger'

import type { PackageFilesResponse, PackageResponse } from '@pnpm/package-store'
import type { CommonOptions } from '../interface'

const authConfig = { registry: NPM_REGISTRY }
export interface RequestOptions {
  alias?: string
  pref?: string
  latest?: boolean
}

let pm: ReturnType<typeof createTemplatePM>

const createCtrl = async ({
  storeDir = STORE_PATH,
  offline,
}: CommonOptions & { offline: boolean }) => {
  const { resolve, fetchers } = createClient({
    authConfig,
    cacheDir: path.join(storeDir, CACHE_DIRNAME),
    preferOffline: offline,
    offline,
  })
  const storeCtrl = await createStore(resolve, fetchers, {
    storeDir,
    verifyStoreIntegrity: true,
    packageImportMethod: 'copy',
  })
  return storeCtrl
}

export const createTemplatePM = async ({ storeDir = STORE_PATH }: CommonOptions) => {
  const storeCtrls = {
    offline: await createCtrl({ storeDir, offline: true }),
    online: await createCtrl({ storeDir, offline: false }),
  }
  return {
    async getCtrl(params: Pick<RequestOptions, 'latest'>) {
      return params.latest ? storeCtrls.online : storeCtrls.offline
    },
    async fetch({ alias, pref, latest = true }: RequestOptions): Promise<PackageResponse> {
      const storeCtrl = await this.getCtrl({ latest })
      const fetchResponse = await storeCtrl!.requestPackage(
        { alias: alias!, pref: pref! },
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
    async request(params: RequestOptions): Promise<PackageResponse> {
      const latest = params.latest
      const pref = params.pref
      const alias = params.alias
      debug.pm('request %s with %s', alias, pref)
      // try download as npm package
      let fetchResponse = await this.fetch({ alias, pref, latest }).catch(() => undefined)
      // try download as remote url
      if (!fetchResponse) {
        fetchResponse = await this.fetch({ pref: alias, latest })
      }
      debug.pm('request response.body %O', fetchResponse.body)
      return fetchResponse
    },
    async import(
      to: string,
      response?: PackageFilesResponse,
      params: Pick<RequestOptions, 'latest'> = { latest: false },
    ) {
      if (!response) {
        return
      }
      debug.pm('import template from store %s', response.fromStore)
      const storeCtrl = await this.getCtrl(params)
      return storeCtrl.importPackage(to, {
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
