module.exports = {
  plugins: {
    'postcss-preset-env': {},
    'rucksack-css': {},
    'postcss-url': {},
    'postcss-write-svg': {
      utf8: false,
    },
    cssnano: {
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: true,
      },
    },
  },
}
