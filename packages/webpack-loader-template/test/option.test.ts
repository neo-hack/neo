import { validateOptions } from '../src/utils/options'

describe('start options test', () => {
  test('empty options is available', () => {
    expect(() => {
      validateOptions({})
    }).not.toThrow()
  })

  test('wrong options type is not allowed', () => {
    expect(() => {
      validateOptions({
        include: 'x' as any,
      })
    }).toThrow()
  })

  test('options.include and options.exclude is conflict', () => {
    expect(() => {
      validateOptions({
        include: ['x'],
        exclude: ['y'],
      })
    }).toThrow()
  })
})
