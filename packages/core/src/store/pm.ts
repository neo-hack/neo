import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'

import {
  CACHE_DIRNAME,
  NPM_REGISTRY,
  STORE_PATH,
} from '../utils/constants'
import { debug } from '../utils/logger'

import type { Options } from 'pacote'
import type { CommonOptions, PackageResponse } from '../interface'

const require = createRequire(import.meta.url)

/**
 * Options for package requests
 * @example
 * // Request latest version from registry
 * { alias: 'react', pref: 'react@18.2.0', latest: true }
 *
 * @example
 * // Request from git repository
 * { pref: 'github:user/repo#main', latest: false }
 *
 * @example
 * // Request local package
 * { pref: 'file:../my-package', latest: false }
 */
export interface RequestOptions {
  /** Package name from package.json */
  alias?: string
  /** Package specifier with version (name@version, git url, etc.) */
  pref?: string
  /** Whether to prefer online registry over cache */
  latest?: boolean
}

export interface PackageFilesResponse {
  fromStore: boolean
  filesIndex: Map<string, string>
}

const createPacoteOptions = ({
  storeDir = STORE_PATH,
  latest,
  offline,
}: CommonOptions): Options => {
  debug.pm('create pacote with options %o', { storeDir, latest })
  const options: Options = {
    registry: NPM_REGISTRY,
    cache: path.join(storeDir, CACHE_DIRNAME),
    // only work when make sure the cache is valid
    offline,
    preferOffline: !latest,
    preferOnline: !!latest,
    // [NOTE] fullMetadata will always run in online mode
    fullMetadata: !!latest,
  }
  debug.pm('resolved pacote options %o', options)
  return options
}

const pacote = require('pacote')

export const createTemplatePM = async ({ storeDir = STORE_PATH }: CommonOptions) => {
  return {
    async hasCache({ pref }: RequestOptions) {
      try {
        const opts = createPacoteOptions({ storeDir, offline: true })
        await pacote.manifest(pref, opts)
        return true
      } catch (error) {
        return false
      }
    },
    async fetch({ alias, pref, latest = false }: RequestOptions): Promise<PackageResponse> {
      const opts = createPacoteOptions({ storeDir, latest })
      const spec = pref || alias!

      const manifest = await pacote.manifest(spec, opts)
      const resolved = await pacote.resolve(spec, opts)

      return {
        body: {
          id: `${manifest.name}/${manifest.version}`,
          latest: manifest.version,
          manifest,
          resolution: {
            integrity: manifest._integrity,
            tarball: resolved,
          },
        },
      }
    },
    async request(params: RequestOptions): Promise<PackageResponse> {
      const latest = params.latest
      const pref = params.pref
      const alias = params.alias
      debug.pm('request %s with %s, is latest', alias, pref, latest)

      try {
        // try download with provided specifier
        return await this.fetch({ alias, pref, latest })
      } catch (error) {
        // try download using alias or perf with online mode
        if (!latest) {
          debug.pm('trying download with online mode')
          try {
            return await this.fetch({ pref, alias, latest: true })
          } catch (fallbackError) {
            debug.pm('request failed for both %s and %s in online mode', pref, alias)
            throw fallbackError
          }
        }
        debug.pm('request failed for %s', pref || alias)
        throw error
      }
    },
    async import(
      to: string,
      response: PackageResponse,
      params: Pick<RequestOptions, 'latest'> = { latest: false },
    ) {
      debug.pm('import template to %s', to)

      const opts = createPacoteOptions({ storeDir, latest: params.latest })
      const spec = response.body.resolution.tarball || response.body.id

      await fs.mkdir(to, { recursive: true })
      await pacote.extract(spec, to, opts)

      return to
    },
    async extract(spec: string, dest: string, latest = true) {
      const opts = createPacoteOptions({ storeDir, latest })
      debug.pm('extracting %s to %s', spec, dest)

      await fs.mkdir(dest, { recursive: true })
      const result = await pacote.extract(spec, dest, opts)

      return {
        fromStore: false,
        filesIndex: new Map<string, string>(),
        ...result,
      }
    },
  }
}

const create = (params: CommonOptions) => {
  return createTemplatePM(params)
}

export default create
