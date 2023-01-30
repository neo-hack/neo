# pnpm-ci

## usage

```console
neo run @aiou/generator-pnpm-ci
```

## features

prepack follow parts into your project

- `release.yml` - publish package with `changeset`
- `snapshot-release.yml` - publish prerelease package with `changeset`
- `.husky & lint-staged` - lint-staged precommit with eslint config [@aiou/eslint-config](https://github.com/JiangWeixian/eslint-config)
- `cz-emoji` - support `git-cz` with [cz-emoji](https://github.com/ngryman/cz-emoji#readme).  
- `ISSUE_TEMPLATE & PR_REQUEST_TEMPLATE` - see [here](https://github.com/neo-hack/neo/tree/master/packages/core/assets/templates) for more details
