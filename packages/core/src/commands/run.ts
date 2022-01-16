import { create, hooks, LIFE_CYCLES } from '@aiou/gen'
import { r } from '../utils'

hooks.addHooks({
  [LIFE_CYCLES.STEP]: (...args) => {
    console.log(args)
  },
})

export const run = async (alias: string) => {
  const workflow = await create(alias)
  await workflow.start()
}

run(r('assets/prepack.yaml'))
