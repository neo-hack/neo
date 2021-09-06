# functional-md
> render markdown content functional

[![npm](https://img.shields.io/npm/v/functional-md)](https://github.com/JiangWeixian/functional-md) [![NPM](https://img.shields.io/npm/l/functional-md)](https://github.com/JiangWeixian/functional-md)

## install

```console
npm install functional-md
```

## usage

### `table`

```ts
import { table } from 'functional-md'

table({
  columns: [
    {
      dataIndex: 'id',
      title: 'ID'
    },
    {
      dataIndex: '',
      title: 'NAME',
      render: (v) => v.name
    }
  ],
  dataSource: [
    {
      id: 1,
      name: 'jw'
    },
    {
      id: 2,
      name: 'jiangweixian'
    }
  ]
})
```

will output

|ID|NAME|
|-----|-----|
|1|jw|
|2|jiangweixian|

### `menu`

```ts
menu({
  dataSource: [
    {
      title: 'jw',
      items: ["1.1", "1.2"]
    },
    {
      title: 'jiangweixian',
      items: [
        {
          title: "2.1"
        },
      ]
    },
  ]
})
```

will output

- jw
  - 1.1
  - 1.2
- jiangweixian
  - 2.1

### `list`

```ts
list({ dataSource: ['1', '2'], limit: 1 })
```

will output

- 1
- ...

### `overflow-list`

```ts
overflowList({ list: ['a', 'b', 'c'], max: 2 })
```

will output

a, b `+1`

### `badge`

```ts
badge({ value: 1 }
```

will output

`+1`

### `code`

```ts
code({ language: 'tsx', value: 'const a = 1' })
```

will output

```tsx
const a = 1
```

### `image`

```ts
image({ alt: 'alt', src: 'https://github.com' })
```

### `link`

```ts
link({ alt: 'alt', href: 'https://github.com' })
```

## features

- table
- menu
- list
- overflow-list
- badge
- code
- image
- link
