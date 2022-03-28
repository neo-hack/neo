import { expect } from 'vitest'
import { toMatchDir, toMatchFile, toMatchFileContent } from 'vitest-extra'

expect.extend({ toMatchDir, toMatchFile, toMatchFileContent })
