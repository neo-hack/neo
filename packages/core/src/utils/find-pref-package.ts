import parseWantedDependency from '@pnpm/parse-wanted-dependency'

import type { Package } from '../interface'

export const parseWantedPackage = (input: string) => {
  const { alias, pref } = parseWantedDependency(input)
  return {
    _name: alias || input,
    name: alias || input,
    alias,
    version: pref,
    pref: alias || input,
  }
}

/**
 * @description find perf package in store
 * @params input: `npm` `npm@version` `url`
 */
export const findPrefPackageByPk = (packages: Partial<Package>[], options: { input: string }) => {
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
