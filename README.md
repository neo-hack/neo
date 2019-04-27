# React-Router-Store-Typescript
![webpackv4](https://img.shields.io/badge/webpack-V4-blue.svg?longCache=true&style=for-the-badge)

## Pre install

* IDE - VSCode
  * install `plugin` - stylint
  * install `plugin` - tslint
* install redux-dev-tools in **Chrome Store**

## Deps

* css
  * css-modules
  * stylus
  * post-css
* react
  * typescript
  * react-router
  * rematch / a framework of redux
* test
  * jest
* webpack v4

**NOTE: `.png|jpg etc files`**

`url-loader`并没有限制`require assets/img`图片大小。**但是如果图片过大，建议还是放在`static folder`中。并且不通过`require`导入，而是`file path`**

**NOTE: `classname`**

在`dev and prd`模式下都开启了`filename`添加到`classname-prefix`（可以选择在去掉配置文件中`css-loader or stylus-loader`相关配置）。**并不影响在`tsx`文件下的使用。**

所以尽量避免在`.styl`文件书写`xx`作为模块名前缀。这一部分`webpack`已经帮你配置配置了。同时书写模块应注意以下原则：

* 避免`index.styl`，除非是`root page styles`
* 尽量书写`模块名.styl`

**NOTE: 关于模块**

`index`文件避免直接书写模块。而是应该

```js
export * from 'xxx'
```

而在`xxx`书写具体的模块代码，`xxx`与文件夹同名。

## How to use it?

```bash
git clone <repo>
cd <repo>
npm install
```
