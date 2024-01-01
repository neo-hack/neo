# pnpm-ci

## usage

```console
neo run @aiou/generator-pnpm-ci
```

## features

prepack follow parts into your project

> **💡 NOTE**  
CI workflows will automatic choose pnpm version and cache `.pnpm-store` via <https://github.com/pnpm/action-setup>.

> **💡 NOTE**  
Changesets release required `settings > actions > Workflow permissions`:
- Read and write permissions
- Allow Github Actions to create and approve all pull request

- `release.yml` - publish package with `changeset`
- `snapshot-release.yml` - publish prerelease package with `changeset`
- `husky`
  - `pre-commit` - precommit with eslint config [@aiou/eslint-config](https://github.com/JiangWeixian/eslint-config) via [`lint-staged`](https://github.com/okonet/lint-staged)
  - `pre-merge` - automatic `pnpm install` if `package.json` changed.
- `cz-emoji` - support `git-cz` with [cz-emoji](https://github.com/ngryman/cz-emoji#readme).  
- `ISSUE_TEMPLATE & PR_REQUEST_TEMPLATE` - see [here](https://github.com/neo-hack/neo/tree/master/packages/core/assets/templates) for more details
