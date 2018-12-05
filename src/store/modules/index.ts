const files = require['context']('..', true, /[a-zA-Z]\/index\.(ts|js)$/)
const modules = []

files.keys().forEach(element => {
  if (element === './index.ts') return
  console.log(element)
})

console.log('folder', __filename)

console.log('files', files.keys())
const test = 'a'
export default test
