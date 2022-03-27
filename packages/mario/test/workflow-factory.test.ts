/* eslint-disable no-template-curly-in-string */
import { tpl, mapValuesDeep, wrapOptions } from '../src/workflow/factory'

describe('tpl', () => {
  it('tpl should work', () => {
    expect(tpl('inputs: ${{ inputs.variable }}', { inputs: { variable: 1 } })).toBe('inputs: 1')
  })

  it('nested inputs', () => {
    expect(
      tpl('inputs: ${{ inputs.nested.variable }}', { inputs: { nested: { variable: 1 } } }),
    ).toBe('inputs: 1')
  })

  it('multiple tpl', () => {
    expect(
      tpl('inputs: ${{ inputs.variable }}, second: ${{ inputs.variable }}', {
        inputs: { variable: 1 },
      }),
    ).toBe('inputs: 1, second: 1')
  })

  it('not work on non-tpl-string', () => {
    expect(tpl('inputs: {{ inputs.variable }}', { inputs: { variable: 1 } })).toBe(
      'inputs: {{ inputs.variable }}',
    )
  })

  it('not work on empty variable', () => {
    expect(tpl('inputs: {{ inputs.variable }}')).toBe('inputs: {{ inputs.variable }}')
  })
})

describe('mapValuesDeep', () => {
  it('basic', () => {
    const result = mapValuesDeep(
      { match: '${{ inputs.variable }}', replacement: '${{ inputs.variable }}' },
      (v) => {
        return tpl(v, {
          inputs: { variable: 1 },
        })
      },
    )
    expect(result).toMatchObject({
      match: '1',
      replacement: '1',
    })
  })

  it('string array options', () => {
    const result = mapValuesDeep(
      { match: ['${{ inputs.variable }}', 'second ${{ inputs.variable }}'] },
      (v) => {
        return tpl(v, {
          inputs: { variable: 1 },
        })
      },
    )
    expect(result).toMatchObject({ match: ['1', 'second 1'] })
  })

  it('obj array options', () => {
    const result = mapValuesDeep(
      { pairs: [{ match: '${{ inputs.variable }}', replacement: '${{ inputs.variable }}' }] },
      (v) => {
        return tpl(v, {
          inputs: { variable: 1 },
        })
      },
    )
    expect(result).toMatchObject({ pairs: [{ match: '1', replacement: '1' }] })
  })

  it('only work on string', () => {
    const result = mapValuesDeep({ match: [false, 'second ${{ inputs.variable }}'] }, (v) => {
      return tpl(v, {
        inputs: { variable: 1 },
      })
    })
    expect(result).toMatchObject({ match: [false, 'second 1'] })
  })
})

it('wrapOptions', () => {
  const result = wrapOptions(
    { match: '${{ inputs.variable }}', replacement: '${{ inputs.variable }}' },
    {
      inputs: { variable: 1 },
    },
  )
  expect(result).toMatchObject({
    match: '1',
    replacement: '1',
  })
})
