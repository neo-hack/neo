# doc - template

## Note

- maybe need to custom `release script` in package.json and other package info
- need reconfig `baseUrl and paths` in `tsconfig.json`

## rules

**DO NOT**

```js
/docs
  /a
  a.md
  b.md
```

**DO NOT**

```js
/docs
  /a
    README.md // wrong
    a.md // right
```

**DO NOT**

```js
/docs
  /中文 // just eng
    /中文 or 英文 // all is ok
```

**DO NOT**

```js
/docs
  /a
    /b
      readme.md // rename to a.md
```