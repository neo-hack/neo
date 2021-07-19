# @aiou/eslint-config-template
*build eslint plugin*

[![npm](https://img.shields.io/npm/v/@aiou/eslint-config-template)](https://github.com/JiangWeixian/templates/tree/master/packages/eslint-config-template) [![GitHub](https://img.shields.io/npm/l/@aiou/eslint-config-template)](https://github.com/JiangWeixian/templates/tree/master/packages/eslint-config-template) [![stackblitz](https://img.shields.io/badge/%E2%9A%A1%EF%B8%8Fstackblitz-online-blue)](https://stackblitz.com/github/JiangWeixian/templates/tree/master/packages/eslint-config-template)

[Edit on StackBlitz ⚡️](https://stackblitz.com/github/JiangWeixian/templates/tree/master/packages/eslint-config-template)

## features

- `on/off` eslint rules
- extends 3rd eslint plugin
- config `prettier`
- lint non `.js/.ts` files

## install

```console
yarn add @aiou/eslint-config-template
```

## usage

in `.eslintrc.js`

```js
module.exports = {
  extends: [
    '@aiou/eslint-config-template'
  ],
}
```
