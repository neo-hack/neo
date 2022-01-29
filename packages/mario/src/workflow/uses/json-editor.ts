import JsonEditor from 'gulp-json-editor'
import { set } from 'lodash-es'

import { Action } from '../../interface'

type JsonEditorOptions = {
  content: Record<string, any>
  pairs: {
    path: string
    value: any
  }[]
}

export const jsonEditor: Action<JsonEditorOptions> = (options) => {
  return JsonEditor(function (json: Record<string, any>) {
    const next = Object.assign(json, options.content)
    if (options.pairs) {
      options.pairs.forEach((pair) => {
        set(next, pair.path, pair.value)
      })
    }
    return next
  })
}
