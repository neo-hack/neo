import cols from 'cli-columns'
import { countBy, groupBy } from 'lodash-es'
import pc from 'picocolors'

import createStore from '../../store'
import { colorify } from '../../utils'
import logger, { debug } from '../../utils/logger'
import { listConfigs } from './list-configs'

import type { ListOptions } from '../../interface'

/**
 * @description List all templates
 * @todo list template with detail
 */
export const list = async (config: string, params: ListOptions) => {
  debug.list('list config options %O', params)
  const store = await createStore(params)
  if (config === 'configs') {
    debug.list('list configs')
    await listConfigs(store, params)
    return
  }
  // list all packages
  const templates = await store.lockFile.readTemplates({ presetNames: params.preset })
  const counters = countBy(templates, 'name')
  if (!templates.length) {
    logger.log('No templates...')
    return
  }
  logger.log(`${pc.cyan('Note:')} ${pc.green('cached')}, ${pc.gray('uncached')}\n`)
  logger.log(pc.bold(pc.white(`Found ${templates.length} templates:\n`)))
  const maps = groupBy(templates, 'preset')
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
