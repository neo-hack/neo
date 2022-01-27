### issue1: add 

`neo add npm@version` will save as

```yaml
name/version: 
  name: npm@version # display name
  perf: npm@version # use it as download pnpm i alias
```

in default, `npm@version` take as `package.name`

**how to fix it**

in default, `npm@version` take as `alias`

```yaml
name/version: 
  name: npm@version # display name
  perf: npm # use it as download pnpm i alias
```

### issue2: create with version

`neo create npm@version`

now `npm@version` will be package-name in default, just like `add`

### issue3: create twice

`neo create` first time

```yaml
name/old version: 
  name: npm # uniq display name
  version: old version # version
  perf: npm # use it as download pnpm i alias
```

`neo create --latest` second time

```yaml
name/new version: 
  name: npm # uniq display name
  version: new version # version
  perf: npm # use it as download pnpm i alias
```

if name duplicated but different pref, will convert to `name(pref)` as uniq list item id

`read templates`

```yaml
name/old version: 
  name: npm # uniq display name
  version: old version # version
  perf: npm # use it as download pnpm i alias

name/new version: 
  name: npm # uniq display name
  version: new version # version
  perf: npm # use it as download pnpm i alias
```

uniq package by pref, will only get old version template

**issue**

`neo create` still use old version

**how to fix it**

generate package a uniq id like `name (pref)`, old version will be overwrite by **new version package**




