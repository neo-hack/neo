module.exports = {
  'plugins': {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-cssnext': {
      'browsers': [ '> 1%' ]
    },
    'cssnano': {
      'preset': 'advanced',
      'autoprefixer': false,
    }
  }
}
