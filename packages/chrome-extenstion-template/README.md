# @aiou/chrome-extenstion-template
> Chrome Extension, TypeScript and Visual Studio Code

[![npm](https://img.shields.io/npm/v/@aiou/chrome-extenstion-template?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/chrome-extenstion-template) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/chrome-extenstion-template)

## Note

- maybe need to custom `prepublishOnly script` in package.json and other package info
- need reconfig `baseUrl and paths` in `tsconfig.json`

## Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

## Option

* [Visual Studio Code](https://code.visualstudio.com/)

## Feature

* support hot reload

## Includes the following

* TypeScript
* React
* axios
* Webpack
* jQuery
* Example Code
    * Chrome Storage
    * Options Version 2
    * content script
    * count up badge number
    * background

## Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

# Dev

## Setup

```
npm install
npm run dev
```

> see how load extension to chrome in Guide part

## Build

```
npm run build
```

# Q&A

* How to Load extension to chrome?

  Open `Setting->Extenstion->Load unpack extenstion`

  Then, Load `dist` directory

  or Check this [video](https://www.notion.so/Chrome-Extentions-23d3afc128644457bfb08022713fe2b1#20aadfedc6cc4b32b6979decbea644ea)

* How to management dom?

  ```js
  const main = document.querySelector('#main')
  const p = document.createElement('p')
  p.innerText = 'this is p'
  main.appendChild(p)
  ```

* How to use axios in chrome-extenstion

  ```js
  // in content.ts
  document.addEventListener('click', (e: any) => {
    axios.get('https://www.google.com')
      .then(res => {
        console.log(res)
      })
  })
  ```
* How to inject css to with content scripts ? - **See it in manifest.json**

* How to use third-party `.css` or `.js` files in popup.html

  ```json
  {
    // ...other config in manifes.json
    "content_security_policy": "script-src 'self' https://code.getmdl.io/1.3.0/material.min.js 'self'; object-src 'self'",
  }
  ```

* How to publish - see this [video](https://www.youtube.com/watch?v=DpdYTAhDWbs)
