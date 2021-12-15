import chalk from 'chalk'
import cols from 'cli-columns'
import groupby from 'lodash.groupby'
import countby from 'lodash.countby'
import uniqby from 'lodash.uniqby'

import { CommonOptions, Package } from './interface'
import log from './utils/logger'
import createStore from './store'

type ListOptions = CommonOptions & {
  preset: string[]
}

const colorify = (pkgs: Partial<Package>[], counters: Record<string, number>) => {
  return pkgs.map((pkg) => {
    if (pkg.cached) {
      return counters[pkg.name!] > 1 && pkg.pref
        ? `${chalk.green(pkg.name)} ${chalk.gray(`(${pkg.pref})`)}`
        : chalk.green(pkg.name)
    }
    return counters[pkg.name!] > 1 && pkg.pref
      ? `${chalk.gray(pkg.name)} ${chalk.gray(`(${pkg.pref})`)}`
      : chalk.gray(pkg.name)
  })
}

/**
 * @description List all templates
 * @todo list template with detail
 */
export const list = async (params: ListOptions) => {
  const store = await createStore(params)
  const templates = uniqby(
    await store.lockFile.readTemplates({ presetNames: params.preset }),
    'pref',
  )
  const counters = countby(templates, 'name')
  if (!templates.length) {
    log.log(`No templates...`)
    return
  }
  log.log(`${chalk.cyan('Note:')} ${chalk.green('cached')}, ${chalk.gray('uncached')}\n`)
  log.log(chalk.bold.white(`Found ${templates.length} templates:\n`))
  const maps = groupby(templates, 'preset')
  if (!params.preset) {
    Object.keys(maps).forEach((key, index) => {
      log.log(key === 'undefined' ? 'Not in preset:' : `${key}:`)
      log.log(cols(colorify(maps[key], counters)))
      if (index !== Object.keys(maps).length - 1) {
        console.log()
      }
    })
    return
  }
  log.log(cols(colorify(templates, counters)))
}
