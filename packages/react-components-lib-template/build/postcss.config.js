const autoprefixer = require('autoprefixer')
const cssnano = require('gulp-cssnano')
const fs = require('fs-extra')
const cssmodules = require('postcss-modules')({
  generateScopedName: 'acfun_[name]_[local]',
  getJSON: function(cssFileName, json, outputFileName) {
    var path = require('path')
    var cssName = path.basename(cssFileName, '.css')
    fs.outputFileSync(cssFileName + '.json', JSON.stringify(json))
    fs.outputFileSync(cssFileName.replace('/components/', '/es/') + '.json', JSON.stringify(json))
    fs.outputFileSync(cssFileName.replace('/components/', '/lib/') + '.json', JSON.stringify(json))
  },
})

module.exports = { autoprefixer, cssnano, cssmodules }
