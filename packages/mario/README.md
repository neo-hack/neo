# @aiou/mario
*Simple Manipulate syste mbased on gulp*

[![npm](https://img.shields.io/npm/v/@aiou/mario)](https://github.com/neo-hack/mario/tree/master) [![GitHub](https://img.shields.io/npm/l/@aiou/mario)](https://github.com/neo-hack/mario/tree/master)

## features

- 🖐️ Similar syntax like github workflow, check supported syntax [here](https://github.com/neo-hack/neo/tree/master/packages/mario/src/interface/index.ts)
- 📦 Builtin most use actions like `replace/copy/clean/json-editor`
- 📝 Work with [listr](https://github.com/neo-hack/neo/blob/master/packages/mario/docs/recipes.md)
- ⚡ Support expression string like [github-outputs](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-defining-outputs-for-a-job)

## install

```console
npm install @aiou/mario
```

## usage

```ts
import { create } from '@aiou/mario'

const mario = await create(filepath)
await mario.start()
```
### common options

common options for `job`

- `job.paths` - Not required, in default will be all files under `process.cwd()`, auto ignore `node_modules`. If specific `paths` but not match files, will skip job.

common options for `uses` `run` in workflow

- `steps.continue-on-error` - no exit if error

```yaml
steps:
  - name: Setup Husky
    run: pnpx --yes husky-init
    continue-on-error: true
```

### uses
**only support builtin actions**

**replace**

```yaml
jobs:
  REPLACE:
    paths: "output/**/*.ts"
    steps:
      - name: Replace Action
      - uses: replace
        with:
          match: one
          replacement: target

      # batch replace
      - name: Replace Action
      - uses: replace
        with:
          pairs:
            - match: two
              replacement: target
            - match: three
              replacement: ${{ outputs.variable }}

```

**json-editor**

```yaml
jobs:
  JSON EDITOR:
    paths: "output/**/*.json"
    steps:
      - name: Json Editor Action
      - uses: json-editor
        with:
          content:
            version: "1.0.0"
          pairs:
            - path: "scripts.ci:prepare"
              value: "pnpm publish"
            - path: "lint-staged"
              value:
                "**/**/*.{js,ts,tsx,vue,json}": ["eslint --fix"]
            
```

- `content` - overwrite matched json file
- `pairs` - partial updated json content
  - `path` - `separator` is `.` like `lodash.set`
  - `value`

**clean**

```yaml
jobs:
  CLEAN:
    paths: "*.ts"
    steps:
      - name: Clean Action
      - uses: clean
        with:
          paths:
            - "output/*"
```

- `output` - clean files matched `output/**`

**copy**

```yaml
jobs:
  COPY:
    paths: "assets.ts"
    steps:
      - name: COPY
      - uses: copy
        with:
          output: output
```

- `output` - copy `paths` files to `output`

## run

```yaml
jobs:
  RUN:
    paths: "output/*"
    steps:
      - name: Run Shell
        run: echo hello
        with:
          quiet: false
```

- `quiet` - silent exec

## how it work

```yaml
jobs:
  //...
  Issue template:
    name: Setup github issue templates
    paths: .neo/**/assets/templates/ISSUE_TEMPLATE/*.md
    steps:
      - name: Issue templates
        uses: copy
        with:
          output: .github/ISSUE_TEMPLATE
  //...
```

will convert to

```ts
gulp.task('Setup github issue templates', function () {
  gulp.src('.neo/**/assets/templates/ISSUE_TEMPLATE/*.md')
    .pipe('copy to output')
    .dest('..')
})
```

## TODO

- [ ] dynamic load external uses action
- [ ] more github workflow syntax, e.g. if

# 
<div align='right'>

*built with ❤️ by 😼*

</div>