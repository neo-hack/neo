import { getOptions } from '../src/utils/options'

describe('start options test', () => {
  test('empty options is available', () => {
    expect(() => {
      getOptions([])
    }).not.toThrow()
  })
})
