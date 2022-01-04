/**
 * @fileoverview select and copy rc file
 */
import inquirer from 'inquirer'
import InquirerSearchList from 'inquirer-search-list'
import tempy from 'tempy'

import { CommonOptions } from './interface'
import createStore from './store'
import logger from './utils/logger'

inquirer.registerPrompt('search-list', InquirerSearchList)

export const listConfigs = async (params: CommonOptions) => {
  // read all config files
  const store = await createStore(params)
  const configs = await store.lockFile.readConfigs()
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
  store.pm.import(tempy.directory(), files)
  // import to tempy dir
  // select then copy it
  // log message
  console.log()
  logger.success(`  🎉 config ${pref?.name} copied, Happy hacking!`)
}
