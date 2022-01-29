# create

## Create in monorepo

In default neo will lookup `pnpm-workspace.yaml`

- if founded, will delete `CHANGELOG.md`, `.eslintrc`, `.eslintignore`, `.changeset`, `.husky`, `.github`
- if not found, will delete `CHANGELOG.md` file only

Also, you can specify what kind of project you created, like `neo create --mono`

## Run generator after create

1. create `.neo/.neorc` in template
2. set follow content

    ```json
    {
      "mario": "@aiou/generator-aiou" 
    }
    ```

    see [here](https://github.com/neo-hack/neo/blob/master/packages/generators/aiou/index.yaml)

    or just local yaml file

    ```json
    {
      "mario": "path/index.yaml" 
    }
    ```

    check [here](https://github.com/neo-hack/neo/blob/master/packages/mario/README.md) for more yaml syntax

