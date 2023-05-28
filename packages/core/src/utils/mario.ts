import { create } from '@aiou/mario'
import { toListr } from '@aiou/mario/helpers'
import { LogLevel } from 'consola'
import Listr from 'listr'

import type { CreateOptions } from '@aiou/mario'

export const runMario = async (
  filepath: string,
  options?: { module?: CreateOptions['jobs'] } & Pick<
    CreateOptions,
    'variables' | 'logLevel' | 'cwd'
  >,
) => {
  const workflow = await create(filepath, {
    logLevel: LogLevel.Silent,
    jobs: options?.module,
    cwd: options?.cwd,
    variables: options?.variables,
  })
  const tasks: Listr.ListrTask[] = toListr(workflow.schema)
  const list = new Listr(tasks, { concurrent: false, exitOnError: true })
  list.run()
  await workflow.start()
}
