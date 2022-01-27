`neo add npm@version` will save as

```yaml
name/version: 
  name: npm@version # display name
  perf: npm@version # use it as download pnpm i alias
```

create twice

`neo create` first time

```yaml
name/version: 
  name: npm # uniq display name
  version: old version # version
  perf: npm # use it as download pnpm i alias
```

`neo create --latest` second time

```yaml
name/version: 
  name: npm # uniq display name
  version: new version # version
  perf: npm # use it as download pnpm i alias
```

if name duplicated, will convert to `name(pref)` as uniq list item id

issue

`neo create` still use old version
