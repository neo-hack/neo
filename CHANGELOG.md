# Template: react-simple-ts
![webpackv4](https://img.shields.io/badge/webpack-V4-blue.svg?longCache=true&style=for-the-badge)

## Feature

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


## Reiview

* [ ] - is css autoprefixer work?

## TODO

* [x] - 是否有必要加入`immer`而不是使用`spread`语法。
    > 好像没有必要。`spread`方法够用了，解决的也是类似的问题。
* [x] - how-to-listen-route-inreact
    * [ref-不使用react-router-redux](https://div.io/topic/2073)
* [x] - 类如`watch`钩子函数好像不需要实现，应该可以通过`shouldComponentUpdate`监听state变化然后做出相应的改变。而 **watch函数最想要的不触发`render`，可以通过对应的在该生命周期中返回`false`实现。**
* [x] - subscripes history change
* [x] - css-modules
* [x] - redux promise / 好像本身就是支持的2
* [x] - redux-dev-tools / 默认就是带的devtools支持
* [ ] - react-cli


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

**batch**

> maybe is chained dispatch

* [ ] - 添加`chain dispatch examples`
