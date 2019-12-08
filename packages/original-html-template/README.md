# @aiou/original-html-template
> original-html-template; No React; Just JS files and original html file self

> 不使用`React`等前端框架的`template`

[![npm](https://img.shields.io/npm/v/@aiou/original-html-template?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/original-html-template)

- [@aiou/original-html-template](#aiouoriginal-html-template)
  - [Features](#features)
  - [Dependencies](#dependencies)
  - [For Devlopers](#for-devlopers)

## Features

1. use webpack
2. support ts
3. `<link />` 会加上`preload`

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
