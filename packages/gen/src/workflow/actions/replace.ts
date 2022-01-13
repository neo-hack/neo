import Replace from 'gulp-replace'

type ReplaceOptions = {
  match: string
  replacement: string
}

export const replace = (options: ReplaceOptions) => {
  console.log(options)
  return Replace(options.match, options.replacement)
}
