import Webpack from 'webpack'
import loadUtils from 'loader-utils'
import schemaValidate from 'schema-utils'
import { validate } from './validate'
import { Options } from '../typings'

const schema = {
  type: 'object',
  properties: {
    exclude: {
      type: 'array',
      description: 'exclude these files in webpack build',
    },
    include: {
      type: 'array',
      description: 'include these files in webpack build',
    },
  },
}

export const validateOptions = (options: Options) => {
  schemaValidate(schema, options, 'webpack-loader-template')
  validate([
    [!!(options.include && options.exclude), 'options.include and options.exclude is conflict'],
  ])
}

export const getOptions = (context: Webpack.loader.LoaderContext): Options => {
  const options = loadUtils.getOptions(context)
  validateOptions(options)
  return options
}
