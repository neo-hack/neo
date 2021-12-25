# neo
> Download templates repo in packages

[![npm](https://img.shields.io/npm/v/@aiou/neo)](https://github.com/neo-hack/neo/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/neo-hack/neo)](https://github.com/neo-hack/neo/tree/master/packages/core)

## Install

`npm install @aiou/neo -g`

## Commands

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
neo create <alias> [project]
```

`options`

- `--preset` - list templates filtered by `preset`. e.g. `neo create --preset=neo`
- `--latest` - create project from remote latest template

### add
> load preset or template to `.neo-store`

**load preset**

```bash
# load preset
neo add <alias> --preset
```

**load template**

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
