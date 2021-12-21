<img width='128' align='right' src='https://user-images.githubusercontent.com/6839576/146879486-df3486cd-ec8d-4f1e-bd96-675f16703752.png' alt='logo' />

*neo - the one. `neo` use `pnpm` to manage your template, create hack project as quick as possible.*


[![npm](https://img.shields.io/npm/v/@aiou/neo)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates)](https://github.com/JiangWeixian/templates/tree/master/packages/core)

## table of contents

- [table of contents](#table-of-contents)
- [install](#install)
- [commands](#commands)
  - [whoami](#whoami)
  - [list](#list)
  - [create](#create)
  - [add](#add)
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
> list all saved templates or preset templates

```bash
neo list
```

`options`

- `--preset` - list templates filtered by `preset`. e.g. `neo list --preset=neo`

### create
> create <project> from <alias>

```bash
neo create <alias> <project>
```

*Once create, will save `template` into `.neo-store`. At second time, it will fetch from local filesystem first*

### add
> load preset or template into `.neo-store`

**load preset**, save collection of `templates` into `.neo-store`

```bash
# load preset
neo add <alias> --preset
```

**load template**, save `template` into `.neo-store`

```bash
# load template
neo add <alias>
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
- `ISSUE_TEMPLATE & PR_REQUEST_TEMPLATE` - see [here](https://github.com/spring-catponents/neo/tree/master/packages/core/assets/templates) for more details

`options`

- `--module` - prepack part of `ci, lint, issue, pr, husky`, e.g `neo prepack --module ci`

