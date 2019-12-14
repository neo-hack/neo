# @aiou/preact-template
> spa preact template(maybe use in mobile)。

> 比较了一下在未`gzip`情况下的`bundle size`。`react`是`~200kb`左右，`preact`是`~67kb`。开启了`gzip`之后，`react`是`~67kb`。体积比较还是很明显的。一般来说`vue`是移动端`site`的选择，`vue`在`gzip`情况下体积是`40kb`。`react`和`vue`区别好像没有那么明显了。
> 至于是否选择`preact`还是`react`见仁见智。因为使用`based on react`的第三方库，兼容性很不错特别是那些`high star repo`。但是其他多多少少会有一点小问题的。

[![npm](https://img.shields.io/npm/v/@aiou/preact-template?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/preact-template)
[![GitHub issues by-label](https://img.shields.io/github/issues/jiangweixian/templates/preact-template?color=red&logo=react&style=for-the-badge)](https://github.com/JiangWeixian/templates/issues/43)
- [@aiou/preact-template](#aioupreact-template)
  - [Features](#features)
  - [Dependencies](#dependencies)
  - [For Devlopers](#for-devlopers)
  - [Refs](#refs)

## Features

1. use webpack
2. support ts
3. `<link />` 会加上`preload`
4. 在移动端可以通过`http:<ip>:port`方式访问

## Dependencies

* typescripts
* css
  * stylus
  * post-css
* react
  * typescript
* webpack v4

## For Devlopers

- custom `prepublishOnly script` in package.json and other package info

1. **推荐使用VSCODE IDE**

   * IDE - VSCode
     * install `plugin` - stylint
     * install `plugin` - tslint
   * install redux-dev-tools in **Chrome Store**

2. **可以使用Rucksack和Rupture** 加速`stylus`开发。分别封装了一些好用`postcss mixins`和`stylus mixins for media query`

3. 路由使用了`react-router docs`里面的`router config`的方式，是否合理见仁见智

4. 使用`rematch`作为`redux framework`。
   - 如要使用`redux-observable`，我也封装了一个`rematch-observable`。
   - 如有`data request`。推荐使用`swr`进行`api`的缓存

## Refs

- [如何让webpack-devserver开启移动端的访问](https://stackoverflow.com/questions/35412137/how-to-get-access-to-webpack-dev-server-from-devices-in-local-network)
- [移动端相关](https://github.com/JiangWeixian/JS-Tips/issues/43#issue-537337358)