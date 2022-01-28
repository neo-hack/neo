import { Package } from '../interface'

import parseWantedDependency from '@pnpm/parse-wanted-dependency'

/**
 * @description find perf package in store
 * @params input: `npm` `npm@version` `url`
 */
export const findPerfPackageByPk = (packages: Partial<Package>[], options: { input: string }) => {
  const { alias, pref } = parseWantedDependency(options.input)
  const perfPackage = packages.find((pkg) => {
    return pkg.name === options.input
  })
  if (perfPackage) {
    return {
      ...perfPackage,
      alias: perfPackage.pref,
    }
  }
  return {
    name: alias || options.input,
    version: pref,
    pref: alias,
    alias: alias || options.input,
  }
}
