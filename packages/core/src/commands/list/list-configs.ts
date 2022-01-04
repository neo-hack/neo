/**
 * @fileoverview select and copy rc file
 */
import inquirer from 'inquirer'
import InquirerSearchList from 'inquirer-search-list'
import path from 'path'
import tempy from 'tempy'
import fs from 'fs-extra'
import copy from 'clipboardy'

import { AsyncReturnType } from '../../interface'
import type createStore from '../../store'
import logger from '../../utils/logger'

inquirer.registerPrompt('search-list', InquirerSearchList)

export const listConfigs = async (store: AsyncReturnType<typeof createStore>) => {
  // read all config files
  const configs = await store.lockFile.readConfigs()
  if (!configs.length) {
    logger.log(`  No configs...`)
    return
  }
  const answers = await inquirer.prompt<{ config: string }>([
    {
      type: 'search-list',
      name: 'config',
      choices: configs.map((c) => ({
        name: c.name,
      })),
    },
  ])
  const pref = configs.find((choice) => choice.name === answers.config)
  if (!pref) {
    return
  }
  const fileResponse = await store.pm.request({ alias: pref.preset, pref: pref.preset })
  const files = await fileResponse?.files?.()
  if (!files) {
    return
  }
  // import to tempy dir
  const dir = tempy.directory()
  store.pm.import(dir, files)
  // copy it
  const filepath = path.join(dir, pref.pref!)
  copy.writeSync(fs.readFileSync(filepath).toString())
  // log message
  console.log()
  logger.success(`  🎉 config ${pref?.name} copied, Happy hacking!`)
}
