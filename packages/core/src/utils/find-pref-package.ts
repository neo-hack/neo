import { randomUUID } from 'node:crypto'

import parseWantedDependency from '@pnpm/parse-wanted-dependency'

import type { Package } from '../interface'
import { debug } from './logger'

export const parseWantedPackage = (input: string) => {
  const { alias, pref } = parseWantedDependency(input)
  const options = {
    _name: alias || input,
    name: alias || input,
    alias,
    version: pref,
    pref: input,
  }
  debug.utils('parse input %s into %O', input, options)
  return options
}

/**
 * @description find perf package in store
 * @params input: `npm` `npm@version` `url`
 */
export const findPrefPackageByPk = (packages: Partial<Package>[], options: { input: string; latest?: boolean }) => {
  if (options.latest) {
    const resolved = parseWantedDependency(options.input)
    return {
      alias: resolved.alias,
      pref: options.input,
      name: options.input,
      cached: false,
      id: randomUUID(),
      version: 'latest',
      _name: options.input,
    }
  }
  const prefPackage = packages.find((pkg) => {
    return pkg.name === options.input
  })
  if (prefPackage) {
    return {
      ...prefPackage,
      alias: parseWantedDependency(prefPackage.pref!).alias || prefPackage.pref,
    }
  }
  return parseWantedPackage(options.input)
}
