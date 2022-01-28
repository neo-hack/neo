- Start Date: (fill me in with today's date, YYYY-MM-DD)
- Reference Issues: (fill in existing related issues, if any)
- Implementation PR: (leave this empty)

# Summary

types and schema, format define in `neo`

# Basic example

see [#detail-design](#detailed-design)

# Motivation

just declare how to create preset package / data-struct inside neo. Make sure it's easy to find package in lock file from `neo create and neo add`

# Detailed design

preset package type define

```ts
// preset package
{
  name: string
  perf?: string
}
```

**`name(perf)` will be preset package uniq id**

- name: display name
- perf: valid npm-package define, e.g `npm@version, npm, github:user/repo`

in the future, I want load templates from `nextjs` repo, which contain templates under `examples`

```ts
// nextjs preset package
{
  name: string
  perf?: string
  templates: [
    // glob patterns
    "examples/**"
  ]
}
```

1. select `nextjs` first
2. then load examples into

or 

1. select `nextjs/xx`, will try to load templates from `nextjs`

package type define in `neo-lock.yaml`

```ts
{
  name: string
  version: string
  perf: string
  id: string
}
```

- name - if package created from preset, **should same as defined in preset packages**
- version
- perf - todo
- version - optional, if perf is `github:xx`
- id - from resolution

`neo create <npm|npm@version|github:user/repo>`

- alias - `npm`, not contain version tag
- name: display name
- perf - `npm@version` or `npm`

1. parse wanted dependency `input=<npm|npm@version|github:user/repo>` to get `alias and perf`
   - `name: alias`, take `input` as fallback `name`
   - `alias`, take `input` as fallback `alias`
   - `perf`, will be undefined

2. find package from `templates` by `name`, to get `pkg`
    
   if `pkg` found
      - `name: pkg.name`
      - `perf: pkg.perf || pkg.name`
      - `version: pkg.version`
    
   if `pkg` not found
      - `name: name`
      - `perf: perf | undefined`

3. download template

if `pkg` found

- download template by `alias: alias, perf: pkg.version`, to get response, and saved as
   - `name: pkg.name`
   - `version: response.version`
   - `id: response.id`
   - `perf: pkg.perf`

if `pkg` not found

- download template by `alias: alias, perf: perf` to get response, and saved as
   - `name: name`
   - `version: response.version`
   - `id: response.id`
   - `perf: alias`

e.g. not cached

```yaml
preset
  - name: @aiou/bin-template
```

`neo create @aiou/bin-template` will save into lockfile with

```yaml
version: response.version
name: @aiou/bin-template
perf: @aiou/bin-template
id: response.id
```

e.g. cached

```yaml
preset
  - name: @aiou/bin-template
templates
  id:
    - version: 1.x
```

e.g. not found

`neo create @aiou/bin-template` will save into lockfile with

```yaml
version: response.version
name: @aiou/bin-template
perf: @aiou/bin-template
id: response.id
```

`neo create @aiou/bin-template@1.x` will save into lockfile with

```yaml
version: 1.x
name: @aiou/bin-template
perf: @aiou/bin-template
id: response.id
```

e.g. preset template with perf

```yaml
preset
  - name: bin-template
    perf: @aiou/bin-template@version
```

`neo create bin-template` will save into lockfile with

```yaml
version: response.version
name: bin-template
perf: @aiou/bin-template@version
id: response.id
```

e.g. interactive mode

```yaml
preset
  - name: bin-template
    perf: @aiou/bin-template@version
  - name: bin-template
    perf: @aiou/another-bin-template@version
```

selection options will be 

```yaml
# option 1
name: bin-template(@aiou/bin-template@version)
perf: @aiou/bin-template@version
# option 2
name: bin-template(@aiou/another-bon-template@version)
perf: @aiou/another-bin-template@version
```

# Adoption strategy

No Adoption

# Unresolved questions

- [ ] perf should same as **preset package perf**
- [ ] should update test files
- [ ] rename the rfc