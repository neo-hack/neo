<img width='128' align='right' src='https://user-images.githubusercontent.com/6839576/146879486-df3486cd-ec8d-4f1e-bd96-675f16703752.png' alt='logo' />

*neo - new repo. `neo` use `pnpm` to manage your template, create hack project as quick as possible.*


[![npm](https://img.shields.io/npm/v/@aiou/neo)](https://github.com/neo-hack/neo/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/neo-hack/neo)](https://github.com/neo-hack/neo/tree/master/packages/core)

## table of contents

- [table of contents](#table-of-contents)
- [install](#install)
- [get started](#get-started)
  - [basic](#basic)
  - [advanced](#advanced)
- [commands](#commands)
  - [list](#list)
    - [list configs](#list-configs)
  - [create](#create)
  - [add](#add)
  - [run](#run)
  - [whoami](#whoami)

## install

```bash
npm install @aiou/neo -g
```

## get started

### basic

Create project from remote `npm-package` as template

```bash
neo create @aiou/bin-template project
```

Or save `@aiou/bin-template` into store first


```bash
neo add @aiou/bin-template
```

In the next time, `neo create` will prefer load template from local store. It's fast ⚡

### advanced

Load collection of templates and config files.

```bash
neo add @aiou/preset-aiou --preset
```

see `@aiou/preset-aiou` detail [here](https://github.com/neo-hack/neo/blob/master/packages/presets/aiou/index.json). 

Then, `neo create` invoke interactive templates list ui, and `neo list configs` invoke interactive configs list ui. Also you can publish your own preset~


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

***Require add preset to local store first**, list all configs from `preset`, see config list format [here](https://github.com/neo-hack/neo/blob/master/packages/presets/demo/index.json). Copy config file content after select specific config file.*

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

### run
> run [`@aiou/mario`]('https://github.com/neo-hack/neo/tree/master/packages/mario) generator

```bash
neo run @aiou/generator-pnpm-ci
```

check [@aiou/generator-pnpm-ci](https://github.com/neo-hack/neo/tree/master/packages/generators/pnpm-ci) for more detail

or yaml filepath

```bash
neo run <filepath>.yaml
```

### whoami

```bash
neo whoami
```
