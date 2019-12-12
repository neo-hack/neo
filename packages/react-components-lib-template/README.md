# @aiou/react-components-lib-template
> a template of react components lib, insipred by [antd-tools](https://github.com/ant-design/antd-tools)

> **@aiou/react-components-lib-template**应该替换为真实的`npm package name`

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

  适配程度更好的方式

  1. 删除`.pipe(replace(/(styl)'/g, "css.json'"))`
  
  ```js
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@aiou/react-components-lib-template',
      },
    ],
  ]
  ```

  same as `babel-plugin-import`

**in dev mode**

- replace `import styles from './style/demo.css.json'` with `import styles from './style/demo.styl'`

## For Dev

- `npm run build`会通过`glupfile.js`进行组件库打包。
- `npm run dev`开启`dev`模式
  - 组件的在线预览是通过在`src/pages/*.tsx`引入`components`文件实现的
- 如何测试
  - 建议在组件下新建`__test__`文件夹
  - `test`的`setupTests.ts`是为了`set config for jest`
  - 如何给`react hooks`测试。建议使用[@testing-library/react-hooks]()
  - 如何给还有借口组件测试
    - 一部分需要参考[@testing-library/react-hooks]()异步组件测试方式
    - 另外在`dev`模式下开启了`umi`的`sever`。任何`localhost:port/proxy/xx`都会指向`example/src/mock`文件夹。这部分请参考[umi]()
- 如何组件命名
  - `Demo`组件对应`components/demo`
  - `DemoView`组件对应`components/demo-view`
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

  - 修改`css-name`。这部分是通过配置`build/postcss.config.js`中`css-modules`