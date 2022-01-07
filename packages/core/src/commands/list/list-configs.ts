/**
 * @fileoverview select and copy rc file
 */
import inquirer from 'inquirer'
import InquirerSearchList from 'inquirer-search-list'
import path from 'path'
import tempy from 'tempy'
import fs from 'fs-extra'
import copy from 'clipboardy'
import pc from 'picocolors'
import cols from 'cli-columns'

import { AsyncReturnType, ListOptions } from '../../interface'
import type createStore from '../../store'
import logger, { debug } from '../../utils/logger'
import { colorify } from '../../utils'
import groupBy from 'lodash.groupby'

inquirer.registerPrompt('search-list', InquirerSearchList)

export const listConfigs = async (
  store: AsyncReturnType<typeof createStore>,
  params: ListOptions,
) => {
  // read all config files
  const configs = await store.lockFile.readConfigs({ presetNames: params.preset })
  if (!configs.length) {
    logger.log(`  No configs...`)
    return
  }
  if (!params.interactive) {
    logger.log(pc.bold(pc.white(`Found ${configs.length} configs:\n`)))
    const maps = groupBy(configs, 'preset')
    if (!params.preset) {
      Object.keys(maps).forEach((key, index) => {
        logger.log(key)
        logger.log(cols(colorify(maps[key])))
        if (index !== Object.keys(maps).length - 1) {
          console.log()
        }
      })
      return
    }
    logger.log(cols(colorify(configs)))
    return
  }
  const answers = await inquirer.prompt<{ config: string }>([
    {
      type: 'search-list',
      name: 'config',
      message: 'Please select config',
      choices: configs.map((c) => ({
        name: c.name,
      })),
    },
  ])
  const pref = configs.find((choice) => choice.name === answers.config)
  if (!pref) {
    debug.list('config not found in preset')
    return
  }
  const fileResponse = await store.pm.request({ alias: pref.preset })
  const files = await fileResponse?.files?.()
  if (!files) {
    return
  }
  // import to tempy dir
  const dir = tempy.directory()
  await store.pm.import(dir, files)
  // copy it
  const filepath = path.join(dir, pref.pref!)
  copy.writeSync(fs.readFileSync(filepath).toString())
  // log message
  console.log()
  logger.success(`  🎉 config ${pc.cyan(pref?.name)} copied, Happy hacking!`)
}
