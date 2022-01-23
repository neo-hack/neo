# @aiou/mario
*Simple Manipulate syste mbased on gulp*

[![npm](https://img.shields.io/npm/v/@aiou/mario)](https://github.com/neo-hack/mario/tree/master) [![GitHub](https://img.shields.io/npm/l/@aiou/mario)](https://github.com/neo-hack/mario/tree/master)

## features

- 🖐️ Similar syntax like github workflow, check supported syntax [here](https://github.com/neo-hack/neo/tree/master/packages/mario/src/interface/index.ts)
- 📦 Builtin most use actions like `replace/copy/clean/json-editor`
- 📝 Work with [listr](https://github.com/neo-hack/neo/blob/master/packages/mario/docs/recipes.md)

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