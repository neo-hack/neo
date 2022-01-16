import { create } from '@aiou/gen'
import { r } from '../utils'

export const run = async (alias: string) => {
  const workflow = await create(alias)
  await workflow.start()
}

run(r('assets/prepack.yaml'))
