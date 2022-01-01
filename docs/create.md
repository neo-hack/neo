# create

## Create in monorepo

In default neo will lookup `pnpm-workspace.yaml`

- if founded, will delete `CHANGELOG.md`, `.eslintrc`, `.eslintignore`, `.changeset`, `.husky`, `.github`
- if not found, will delete `CHANGELOG.md` file only

Also, you can specify what kind of project you created, like `neo create --mono`