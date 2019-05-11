# Template: react-simple-ts
![webpackv4](https://img.shields.io/badge/webpack-V4-blue.svg?longCache=true&style=for-the-badge)

## 20190510

* add types for css-moduels(类名不要有 js 关键字)
* [use thread-load](https://github.com/TypeStrong/ts-loader/blob/master/examples/thread-loader/webpack.config.js) - 不再使用`happypack`

## 20190503

* use husky - pre-commit
* use preiite

## 2019-04-27

* 设置项目`NPM`源淘宝源
* `PROD`模式下，开启为`CSS-ClassName`添加文件名前缀

## Init

* [x] - typescript
* [x] - stylus
    > linter for typescript and stylus
* [x] - react
    > support react-hot-loader
    * [x] - `redux` / react-redux 
        > use `rematch` in easy way
    * [x] - react-router
    * [x] - react-router-transition
        > just add it! not test
    * [x] - history watcher
        > maybe we don't need react-router-redux

**spead the pack**

* [x] - happypack - 时间怎么还变长了，等文件变多了再看看把（狗头
* [x] - ~~dll~~ - 好像没有必要

参考：

* [vue-with happypack&dll](https://juejin.im/post/5a922e776fb9a06337575031)
* [happypack with ts](https://github.com/amireh/happypack) / 有个example
* [happypack with webpack4](https://juejin.im/post/5ab7c222f265da237f1e4434)

**Add test**

* [x] - Jest

参考:

* [jest enzyme work with ts](https://medium.com/@mateuszsokola/configuring-react-16-jest-enzyme-typescript-7122e1a1e6e8)
* [use ts-jest examples](https://github.com/MeCKodo/wechat-colorpicker/blob/master/__test__/jest.conf.js)
* [ts-jest another example](https://medium.com/@mtiller/debugging-with-typescript-jest-ts-jest-and-visual-studio-code-ef9ca8644132)
* [how to config jest](https://jestjs.io/docs/en/configuration#rootdir-string)
    > mock setup files是需要下载的

**Mini the build size**
* [x] - ~~mini the lodash~~ [@how-to-shake-lodash](https://medium.com/@martin_hotell/tree-shake-lodash-with-webpack-jest-and-typescript-2734fa13b5cd) / 当前方式已经够用
* [x] - mini css/js size by webpack plugin
