import { createUtils, transformGroups as _transformGroups } from '@windicss/plugin-utils'
import { CSSParser } from 'windicss/utils/parser'
import Windicss from 'windicss'

let utils

export const getWindiCSSService = async (options) => {
  if (utils) {
    return utils
  }
  utils = createUtils(
    options,
    {
      name: 'babel-plugin-styled-windicss',
      onConfigurationError(e) {
        throw e
      },
    },
  )
  await utils.init()
  return utils
}

const processor = new Windicss()

export const parse = (content) => {
  const parser = new CSSParser(content, processor)
  return parser.parse().build()
}

export const transformGroups = (content) => {
  return _transformGroups(content)
}
