import Webpack from 'webpack'

import { getOptions } from './utils/options'

function loader(this: Webpack.loader.LoaderContext, source: string) {
  const options = getOptions(this)
  if (!options.include || !options.exclude) {
    return source
  }
  return source
}

export default loader
