<img width='128' align='right' src='https://user-images.githubusercontent.com/6839576/146879486-df3486cd-ec8d-4f1e-bd96-675f16703752.png' alt='logo' />

*neo - new repo. `neo` use `pnpm` to manage your template, create hack project as quick as possible.*


[![npm](https://img.shields.io/npm/v/@aiou/neo)](https://github.com/neo-hack/neo/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/neo-hack/neo)](https://github.com/neo-hack/neo/tree/master/packages/core)

## table of contents

- [table of contents](#table-of-contents)
- [install](#install)
- [commands](#commands)
  - [list](#list)
    - [list configs](#list-configs)
  - [create](#create)
  - [add](#add)
  - [prepack](#prepack)
  - [whoami](#whoami)

## install

```bash
npm install @aiou/neo -g
```

## commands

### list
> list all saved templates or preset templates

```bash
neo list
```

`options`

- `--preset` - list templates filtered by `preset`. e.g. `neo list --preset=neo`

In default, `neo list` only display templates.

#### list configs

**Require add preset to local store first**, list all configs from `preset`, see config list format [here](https://github.com/neo-hack/neo/blob/master/packages/presets/demo/index.json). Copy config file content after select specific config file.

```bash
neo list configs
```

`options`

- `--preset` - list configs filtered by `preset`. e.g. `neo list configs --preset=neo`
- `--no-interactive` - list configs without interactive ui, display only.

### create
> create project

```bash
neo create <alias> <project>
```

*Once create, will save `template` into `.neo-store`. At second time, it will fetch from local filesystem first*

`options`

- `--preset` - list templates filtered by `preset`. e.g. `neo create --preset=neo`
- `--latest` - create project from remote latest template

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
- `ISSUE_TEMPLATE & PR_REQUEST_TEMPLATE` - see [here](https://github.com/neo-hack/neo/tree/master/packages/core/assets/templates) for more details

`options`

- `--module` - prepack part of `ci, lint, issue, pr, husky`, e.g `neo prepack --module ci`

### whoami

```bash
neo whoami
```
