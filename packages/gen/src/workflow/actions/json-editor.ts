import JsonEditor from 'gulp-json-editor'
import { Action } from '../../interface'

type JsonEditorOptions = {
  content: Record<string, any>
}

export const jsonEditor: Action<JsonEditorOptions> = (options) => {
  return JsonEditor(function (json: Record<string, any>) {
    const next = Object.assign(json, options.content)
    return next
  })
}
