import {
  isObject,
  isString,
  mapValues,
  template,
  templateSettings,
} from 'lodash-es'

import type { Action, Context } from '../interface'

templateSettings.interpolate = /\${{([\s\S]+?)}}/g

/**
 * @description tpl format like `${{ inputs.variable }}`
 */
export const tpl = (templateString: string, variable?: Record<string, any>) => {
  if (!variable || !isString(templateString)) {
    return templateString
  }
  const compiled = template(templateString)
  return compiled(variable)
}

export const mapValuesDeep = (
  v: Record<string, any>,
  callback: (value: string) => any,
): Record<string, any> =>
  Array.isArray(v)
    ? v.map(v => mapValuesDeep(v, callback))
    : isObject(v)
      ? mapValues(v, v => mapValuesDeep(v, callback))
      : callback(v)

export const wrapOptions = (options: Record<string, any>, variables: Context['variables']) => {
  return mapValuesDeep(options, v => tpl(v, variables))
}

export const factory = (action: Action<any>): Action<any> => {
  return (options, ctx) => {
    const next = wrapOptions(options, ctx.variables)
    return action(next, ctx)
  }
}
