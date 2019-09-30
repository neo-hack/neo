const globby = require('globby')
const path = require('path')

const tpls = globby.sync('*.tpl', {
  cwd: path.join(process.cwd(), 'packages/react-components-lib-template', 'template'),
  dot: true,
})

console.log(tpls)
