# typescript-transform-extensions

[![npm version](https://img.shields.io/npm/v/typescript-transform-extensions.svg)](https://www.npmjs.com/package/typescript-transform-extensions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Transforms imports to include the file extension of the resolved import, [necessary for ES Modules](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions).

> This TypeScript plugin is helpful along with [typescript-transform-paths](https://www.npmjs.com/package/typescript-transform-paths). This plugin was inspired by [typescript-transform-paths](https://www.npmjs.com/package/typescript-transform-paths), thank you for all of your hard work!

## Usable with [ttypescript](https://github.com/cevek/ttypescript/) or [ts-patch](https://github.com/nonara/ts-patch)

## Install

npm:

```sh
npm i -D typescript-transform-extensions
```

yarn:

```sh
yarn add -D typescript-transform-extensions
```

## Example Config

Add it to _plugins_ in your _tsconfig.json_

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "typescript-transform-extensions",
        "extensions": {".ts": ".js"}
      }
    ]
  }
}
```

## Example output

```
- dest/
  - path/
    - to/
      -import/
        - file.js
  - subdir/
    - main.js

- src/
  - path/
    - to/
      -import/
        - file.ts
  - subdir/
    - main.ts
```

`src/path/to/import/file.ts`

```ts
export function sum2(first: number, second: number) {
  return first + second;
}
```

`src/subdir/main.ts`

```ts
import {sum2} from "../path/to/import/file";

sum2(2, 3);
```

Gets compiled to:

> If `compilerOptions.module` is "CommonJS"

`dest/subdir/main.js`

```js
var sum_1 = require("../path/to/import/file.js");
sum_1.sum2(2, 3);
```

> If `compilerOpions.module` is "ES2015", "ES2020", "ES6", or "ESNext"

`dest/subdir/main.js`

```js
import {sum2} from "../path/to/import/file.js";
sum2(2, 3);
```

## Contributting

Contributions are welcome!

- make sure to format code with prettier:

```sh
npm run format
```
