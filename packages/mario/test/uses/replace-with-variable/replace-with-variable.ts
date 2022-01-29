import { create } from '../../../src'
import { r } from '../../helpers'

export const main = async () => {
  const workflow = await create(r('test/uses/replace-with-variable/replace-with-variable.yaml'), {
    cwd: r('test/uses/replace-with-variable'),
    variables: {
      outputs: {
        variable: 'global',
      },
    },
  })
  await workflow.start()
}
