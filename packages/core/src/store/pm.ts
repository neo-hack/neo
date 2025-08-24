import fs from 'node:fs/promises'
import path from 'node:path'

import * as pacote from 'pacote'

import {
  CACHE_DIRNAME,
  NPM_REGISTRY,
  STORE_PATH,
} from '../utils/constants'
import { debug } from '../utils/logger'

import type { PacoteOptions } from 'pacote'
import type { CommonOptions, PackageResponse } from '../interface'

/**
 * Options for package requests
 * @example
 * // Request latest version from registry
 * { alias: 'react', pref: '18.2.0', latest: true }
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
  /** Package alias name */
  alias?: string
  /** Package specifier (name@version, git url, etc.) */
  pref?: string
  /** Whether to prefer online registry over cache */
  latest?: boolean
}

export interface PackageFilesResponse {
  fromStore: boolean
  filesIndex: Map<string, string>
}

let pm: ReturnType<typeof createTemplatePM>

const createPacoteOptions = ({
  storeDir = STORE_PATH,
  latest,
}: CommonOptions): PacoteOptions => {
  return {
    registry: NPM_REGISTRY,
    cache: path.join(storeDir, CACHE_DIRNAME),
    preferOnline: !!latest,
    fullMetadata: true,
  }
}

export const createTemplatePM = async ({ storeDir = STORE_PATH }: CommonOptions) => {
  return {
    async fetch({ alias, pref, latest = true }: RequestOptions): Promise<PackageResponse> {
      const opts = createPacoteOptions({ storeDir, latest })
      const spec = alias || pref!

      const manifest = await pacote.manifest(spec, opts)
      const resolved = await pacote.resolve(spec, opts)

      return {
        body: {
          id: `${manifest.name}@${manifest.version}`,
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
        // try download as npm package
        return await this.fetch({ alias, pref, latest })
      } catch (error) {
        // try download as remote url
        try {
          return await this.fetch({ pref: alias, latest })
        } catch (fallbackError) {
          debug.pm('request failed for both %s and %s', alias, pref)
          throw fallbackError
        }
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
