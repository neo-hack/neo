# templates cli
> Download templates repo in packages

[![npm](https://img.shields.io/npm/v/@aiou/neo)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates)](https://github.com/JiangWeixian/templates/tree/master/packages/core)

## Install

`npm installl @aiou/neo -g`

## Commands

1. `neo list` - list all templates
2. `neo create <template-name> <project-name>` - create `project-name` from `template-name`
3. `neo whomai` - who is neo
4. `neo prepack` - prepack `ci & lint & precommit, etc...` into project, including...

    - `release.yml` - publish package with `changeset`
    - `snapshot-release.yml` - publish prerelease package with `changeset`
    - `.husky & lint-staged` - lint-staged precommit
    - `.eslintrc.js` - eslint config [@aiou/eslint-config](https://github.com/JiangWeixian/eslint-config)
    - `ISSUE_TEMPLATE & PR_REQUEST_TEMPLATE` - see [here](https://github.com/spring-catponents/templates/tree/master/packages/core/assets/templates) for more details