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

* [x] - how-to-listen-route-inreact
    * [ref-不使用react-router-redux](https://div.io/topic/2073)
* [x] - 类如`watch`钩子函数好像不需要实现，应该可以通过`shouldComponentUpdate`监听state变化然后做出相应的改变。而 **watch函数最想要的不触发`render`，可以通过对应的在该生命周期中返回`false`实现。**
* [x] - subscripes history change

**Mini the build size**
* [x] - ~~mini the lodash~~ [@how-to-shake-lodash](https://medium.com/@martin_hotell/tree-shake-lodash-with-webpack-jest-and-typescript-2734fa13b5cd) / 当前方式已经够用
* [x] - mini css/js size by webpack plugin
