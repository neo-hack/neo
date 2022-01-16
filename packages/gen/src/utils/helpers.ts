import { Workflow } from '../interface'
import { hooks } from '../utils/hooks'

import Observable from 'zen-observable'
import type Listr from 'listr'
import { LIFE_CYCLES } from 'src/constants'

/**
 * @description convert schema to listr
 */
export const toListr = (schema: Workflow) => {
  const tasks: Listr.ListrTask[] = Object.keys(schema.jobs || {}).map((key) => {
    const taskName = schema.jobs![key].name || key
    return {
      title: taskName,
      task: () => {
        let ob: ZenObservable.SubscriptionObserver<any>
        const OB = new Observable<any>((observer) => {
          ob = observer
        })
        hooks.addHooks({
          [LIFE_CYCLES.STEP]: (args: { step: string }) => {
            ob.next(args.step)
          },
          [taskName]: () => {
            ob.complete()
          },
        })
        return OB as any
      },
    }
  })
  return tasks
}
