function getOption({ opts }, name, defaultValue = true) {
  return opts[name] === undefined || opts[name] === null ? defaultValue : opts[name]
}

export const useTopLevelImportPaths = (state) => getOption(state, 'topLevelImportPaths', [])
export const useTranspileTemplateLiterals = () => true

export const usePureAnnotation = (state) => getOption(state, 'pure', false)

export const useCssProp = () => true
