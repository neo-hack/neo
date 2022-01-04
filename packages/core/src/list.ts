import pc from 'picocolors'
import cols from 'cli-columns'
import groupby from 'lodash.groupby'
import countby from 'lodash.countby'
import uniqby from 'lodash.uniqby'

import { CommonOptions, Package } from './interface'
import logger from './utils/logger'
import createStore from './store'

type ListOptions = CommonOptions & {
  preset: string[]
}

const colorify = (pkgs: Partial<Package>[], counters: Record<string, number>) => {
  return pkgs.map((pkg) => {
    if (pkg.cached) {
      return counters[pkg.name!] > 1 && pkg.pref
        ? `${pc.green(pkg.name)} ${pc.gray(`(${pkg.pref})`)}`
        : pc.green(pkg.name)
    }
    return counters[pkg.name!] > 1 && pkg.pref
      ? `${pc.gray(pkg.name)} ${pc.gray(`(${pkg.pref})`)}`
      : pc.gray(pkg.name)
  })
}

/**
 * @description List all templates
 * @todo list template with detail
 */
export const list = async (params: ListOptions) => {
  const store = await createStore(params)
  // list all packages
  const templates = uniqby(
    await store.lockFile.readTemplates({ presetNames: params.preset }),
    'pref',
  )
  const counters = countby(templates, 'name')
  if (!templates.length) {
    logger.log(`No templates...`)
    return
  }
  logger.log(`${pc.cyan('Note:')} ${pc.green('cached')}, ${pc.gray('uncached')}\n`)
  logger.log(pc.bold(pc.white(`Found ${templates.length} templates:\n`)))
  const maps = groupby(templates, 'preset')
  if (!params.preset) {
    Object.keys(maps).forEach((key, index) => {
      logger.log(key === 'undefined' ? 'Not in preset:' : `${key}:`)
      logger.log(cols(colorify(maps[key], counters)))
      if (index !== Object.keys(maps).length - 1) {
        console.log()
      }
    })
    return
  }
  logger.log(cols(colorify(templates, counters)))
}
