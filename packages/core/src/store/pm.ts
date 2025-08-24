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

const pm: ReturnType<typeof createTemplatePM> | undefined = undefined

const createPacoteOptions = ({
  storeDir = STORE_PATH,
  latest,
}: CommonOptions): Options => {
  return {
    registry: NPM_REGISTRY,
    cache: path.join(storeDir, CACHE_DIRNAME),
    preferOnline: latest,
    fullMetadata: true,
  }
}

const pacote = require('pacote')

export const createTemplatePM = async ({ storeDir = STORE_PATH }: CommonOptions) => {
  return {
    async fetch({ alias, pref, latest = true }: RequestOptions): Promise<PackageResponse> {
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
      debug.pm('request %s with %s', alias, pref)

      try {
        // try download with provided specifier
        return await this.fetch({ alias, pref, latest })
      } catch (error) {
        // try download using alias as specifier if pref failed
        if (pref && alias && pref !== alias) {
          try {
            return await this.fetch({ pref: alias, latest })
          } catch (fallbackError) {
            debug.pm('request failed for both %s and %s', pref, alias)
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
  if (pm) {
    return pm
  }
  return createTemplatePM(params)
}

export default create
