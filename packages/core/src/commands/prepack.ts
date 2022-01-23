import logger from '../utils/logger'
import { run, RunOptions } from './run'

import { usage } from '../utils/show-usage'

export const prepack = async (options: RunOptions) => {
  logger.log(`Prepack will deprecate in next version, please use: \n ${usage.run()}\n`)
  await run('@aiou/generator-pnpm-ci', { module: options.module })
}
