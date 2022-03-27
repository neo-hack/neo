import { r } from '../../helpers'
import { create } from '../../../src'

import fs from 'fs-extra'

beforeAll(() => {
  fs.copySync(r('test/uses/replace/input'), r('test/uses/replace/output'))
})

it('uses replace should work', async () => {
  const workflow = await create(r('test/uses/replace/replace.yaml'), {
    cwd: r('test/uses/replace'),
  })
  await workflow.start()
  expect(r('test/uses/replace/output/index.ts')).toMatchFile(
    r('test/uses/replace/expected/index.ts'),
  )
})
