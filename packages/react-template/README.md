# react-template

## Note

- maybe need to custom `prepublishOnly script` in package.json and other package info
- need reconfig `baseUrl and paths` in `tsconfig.json`

## Options

* IDE - VSCode
  * install `plugin` - stylint
  * install `plugin` - tslint
* install redux-dev-tools in **Chrome Store**

## Deps

* typescripts
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
  - **`.png|jpg etc files`**

    `url-loader`并没有限制`require assets/img`图片大小。**但是如果图片过大，建议还是放在`static folder`中。并且不通过`require`导入，而是`file path`**

  - **`classname`**

    在`dev and prd`模式下都开启了`filename`添加到`classname-prefix`（可以选择在去掉配置文件中`css-loader or stylus-loader`相关配置）。**并不影响在`tsx`文件下的使用。**

    所以尽量避免在`.styl`文件书写`xx`作为模块名前缀。这一部分`webpack`已经帮你配置配置了。同时书写模块应注意以下原则：

    * 避免`index.styl`，除非是`root page styles`
    * 尽量书写`模块名.styl`
