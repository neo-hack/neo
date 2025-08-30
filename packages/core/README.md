<img width='128' align='right' src='https://user-images.githubusercontent.com/6839576/146879486-df3486cd-ec8d-4f1e-bd96-675f16703752.png' alt='logo' />

*neo - new repo. `neo` use `pacote` to manage your template, create hack project as quick as possible.*


[![npm](https://img.shields.io/npm/v/@aiou/neo)](https://github.com/neo-hack/neo/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/neo-hack/neo)](https://github.com/neo-hack/neo/tree/master/packages/core)

## table of contents

- [table of contents](#table-of-contents)
- [install](#install)
- [get started](#get-started)
- [contribute](#contribute)

## install

```bash
npm install @aiou/neo -g
```

## get started

Create project from remote `npm-package` as template

```bash
neo create @aiou/bin-template project
```

Or save `@aiou/bin-template` into store first


```bash
neo add @aiou/bin-template
```

In the next time, `neo create` will prefer load template from local store. It's fast ⚡

Check [Documentation](https://neo-docs.netlify.app) for more details.

## contribute

environment require 

- `pnpm@^10.x`
- `node^20`