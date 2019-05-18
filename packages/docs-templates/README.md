# doc - template

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