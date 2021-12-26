# @aiou/schema
> schema of neo, like preset schema

## preset

```ts
{
  "templates": [
    {
      "name": "@aiou/ts-lib-template",
    },
    {
      "name": "@aiou/ts-lib-template",
      "pref: "https://github.com/neo-hack/ts-lib-template",
    },
  ]
}
```

`template`

In default, `name` of template will be `npm-package-name`. It will be displayed in `neo list` or `neo create` options.

If `perf` defined, `neo` will fetch from `pref` instead of `name` as template.

- `name` - `npm-package-name`. If `pref` defined, it will just `display` name.
- `pref` - template id, it could be `npm-package-name`, `github-url` etc... 
