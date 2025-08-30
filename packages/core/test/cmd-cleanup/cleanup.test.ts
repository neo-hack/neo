import fs from 'fs-extra'

import { execNeo, storeDir } from '../helpers'

describe('cleanup', () => {
  it('clearnup should work', async () => {
    await execNeo(['cleanup', '--store-dir', storeDir])
    expect(fs.existsSync(storeDir)).toBe(true)
    expect(fs.readdirSync(storeDir)).toEqual([])
  })
})
