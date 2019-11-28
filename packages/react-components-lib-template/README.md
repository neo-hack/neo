# @aiou/react-components-lib-template
> a template of react components lib, insipred by [antd-tools](https://github.com/ant-design/antd-tools)

[![npm](https://img.shields.io/npm/v/@aiou/react-components-lib-template?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/react-components-lib-template)

- [@aiou/react-components-lib-template](#aioureact-components-lib-template)
  - [Useage of Single Component lib](#useage-of-single-component-lib)
    - [with babel-plugin-import](#with-babel-plugin-import)
  - [For Dev](#for-dev)

## Useage of Single Component lib

### with babel-plugin-import

- use with `umi`
  
  ```js
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@aiou/react-components-lib-template',
        style: 'css',
      },
    ],
  ]
  ```

  same as `babel-plugin-import`

**in dev mode**

- replace `import styles from './style/demo.css.json'` with `import styles from './style/demo.styl'`

## For Dev

- 如何导入外部的`stylus lib`
  
  ```js
  .pipe(
    stylus({
      'include css': true,
      set: ['resolve url'],
      use: [plugin()], // some stylus plugin like nib
      import: [
        path.resolve(
          __dirname,
          'path/index.styl', // external stylus path
        ),
        path.resolve(__dirname, 'components/style/gray.styl'),
      ],
    }),
  )
  
  ```