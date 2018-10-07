module.exports = {
  'plugins': {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-js': {},
    'postcss-cssnext': {
      'browsers': [ '> 1%' ]
    },
    'cssnano': {
      'preset': 'advanced',
      'autoprefixer': false,
    }
  }
}
