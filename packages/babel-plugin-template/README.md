# @aiou/babel-plugin-template
*build babel plugin*

[![npm](https://img.shields.io/npm/v/@aiou/babel-plugin-template)](https://github.com/JiangWeixian/templates/tree/master/packages/babel-plugin-template) [![GitHub](https://img.shields.io/npm/l/@aiou/babel-plugin-template)](https://github.com/JiangWeixian/templates/tree/master/packages/babel-plugin-template) [![stackblitz](https://img.shields.io/badge/%E2%9A%A1%EF%B8%8Fstackblitz-online-blue)](https://stackblitz.com/github/JiangWeixian/templates/tree/master/packages/babel-plugin-template)

[Edit on StackBlitz ⚡️](https://stackblitz.com/github/JiangWeixian/templates/tree/master/packages/babel-plugin-template)

## feature

1. support babel snapshot test

## install

Install the plugin first:

```
npm install --save-dev babel-plugin-template
```

Then add it to your babel configuration:

```JSON
{
  "plugins": ["babel-plugin-template"]
}
```
## usage

**compile tailwindcss `@apply`**

```tsx
// input
const Wrapped = styled(Inner)`
  color: red;
  @apply m-0 p-0 w-100vw h-100vh overflow-hidden;
`
// output
const Wrapped = styled(Inner)`
  color: red;
  margin: 0px;
  overflow: hidden;
  padding: 0px;
  width: 100vw;
`
```

**compile windicss `group`**

> **⚠️ WARNING**  
`@apply` should wrapped in `${ }` to support windicss `group`

- **limitations**

```tsx
// input
const Wrapped = styled(Inner)`
  & {
    @apply m-0 p-0 w-100vw h-100vh overflow-hidden hover:(bg-blue-500 text-xs);
  }
`

const Wrapped = styled(Inner)`
  color: red;
  &:hover {
    -tw-bg-opacity: 1;
    background-color: rgba(59, 130, 246, var(--tw-bg-opacity));
    font-size: 0.75rem;\
    line-height: 1rem;
  }
  & {
    height: 100vh;
    margin: 0px;
    overflow: hidden;
    padding: 0px;
    width: 100vw;
  }
`
```


