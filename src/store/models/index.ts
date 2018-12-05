const files = require['context']('.', true, /[a-zA-Z]\/index\.(ts|js)$/)
const modules = {}

files.keys().forEach(element => {
  if (element === './index.ts') return
  const name = element.replace(/(\.\/|\/index\.(ts|js))/g, '')
  modules[name] = files(element).default
})

export default modules
