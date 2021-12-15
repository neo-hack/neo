import chalk from 'chalk'
import uniqby from 'lodash.uniqby'

import { CommonOptions } from './interface'
import log from './utils/logger'
import createStore from './store'

/**
 * @description List all templates
 */
export const list = async (params: CommonOptions) => {
  const store = await createStore(params)
  const templates = uniqby(await store.lockFile.readTemplates(), 'name')
  if (!templates.length) {
    log.log(`No templates...`)
    return
  }
  log.log(`Found ${templates.length} templates...`)
  console.log()
  // TODO: list template with detail
  templates.forEach((tpl) => {
    console.log(`  ${chalk.blue('•')} ${chalk.bold.green(tpl.name)}`)
  })
  console.log()
}
