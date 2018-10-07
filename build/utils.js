const path = require('path')

// NOTE: match /node_modules/react?
exports.splitReact  = (modulePath) => {
  let reactArrs = ['react', 'react-dom']
  reactArrs = reactArrs.map((item) => {
    return path.join(__dirname, `../node_modules/${item}`)
  })
  return reactArrs.some((item) => {
    return modulePath.indexOf(item) === 0
  })
}
