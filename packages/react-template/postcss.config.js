module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          overrideBrowserslist: ['> 1%'],
        },
      },
    ],
    'rucksack-css',
    'postcss-import',
    'postcss-url',
    [
      'cssnano',
      {
        preset: 'advanced',
        autoprefixer: false,
      },
    ],
  ],
}
