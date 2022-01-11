import Replace from 'gulp-replace-task'

type ReplaceOptions = {
  patterns: {
    match: string
    replacement: string
  }[]
}

export const replace = (options: ReplaceOptions) => {
  console.log(options)
  return Replace(options)
}
