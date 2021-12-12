<div align="center">

![logo](/docs/logo.png)

*the one - neo*

[![npm](https://img.shields.io/npm/v/@aiou/neo)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates)](https://github.com/JiangWeixian/templates/tree/master/packages/core)

<img src="https://user-images.githubusercontent.com/6839576/83341699-f436dc00-a318-11ea-9cf5-60b4ee16cfa7.gif" width="640" />

</div>


## table of contents

- [table of contents](#table-of-contents)
- [install](#install)
- [commands](#commands)
  - [whoami](#whoami)
  - [list](#list)
  - [create](#create)
  - [prepack](#prepack)

## install

```bash
npm install @aiou/neo -g
```

## commands

### whoami

```bash
neo whoami
```

<div align='center'>

![whoami](/packages/core/assets/neo.jpg)  
*▲ whoami*

</div>

### list
> list all builtin templates

```bash
neo list
```

### create
> create [project-name] from [template-name]

```bash
neo create <template-name> [project-name]
```

### prepack
> prepack `ci & lint & precommit` into packages

```bash
neo prepack
```

including...

- `release.yml` - publish package with `changeset`
- `snapshot-release.yml` - publish prerelease package with `changeset`
- `.husky & lint-staged` - lint-staged precommit
- `.eslintrc.js` - eslint config [@aiou/eslint-config](https://github.com/JiangWeixian/eslint-config)
- `ISSUE_TEMPLATE & PR_REQUEST_TEMPLATE` - see [here](https://github.com/spring-catponents/templates/tree/master/packages/core/assets/templates) for more details

`options`

- `--module` - prepack part of `ci, lint, issue, pr, husky`, e.g `neo prepack --module ci`

