<div align="center">

# @aiou/chrome-extenstion-template

[![npm](https://img.shields.io/npm/v/@aiou/chrome-extenstion-template?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/chrome-extenstion-template) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/chrome-extenstion-template)

</div>

- [@aiou/chrome-extenstion-template](#aiouchrome-extenstion-template)
  - [custom](#custom)
    - [basic](#basic)
    - [different ctx type](#different-ctx-type)
  - [features](#features)
  - [stacks](#stacks)
  - [folder structure](#folder-structure)
  - [development](#development)
    - [setup & install](#setup--install)
    - [build](#build)
  - [Q&A](#qa)

## custom

### basic

- custom package info in `package.json & publick/manifest.json`

### different ctx type

1. content mode - in default, this template work on any live webpage

2. newtab mode 

    create `src/tab.tsx`


    create `public/tab.html`

    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <title>New Tab</title>
    </head>

    <body>
      <div id="APP"></div>
      
      <script src="js/vendor.js"></script>
      <script src="js/myPage.js"></script>
    </body>
    </html>
    ```

    modify `webpack.common.js`

    ```tsx
    entry: {
      ...
      tab: path.join(__dirname, srcDir + 'tab.tsx'),
    }
    ```

    modify `public/manifest.json`

    ```json
    {
      "chrome_url_overrides" : {
        "newtab": "myPage.html"
      },
    }
    ```

## features

* support hot reload

## stacks

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

## folder structure

* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## development

### setup & install

```
npm install
npm run dev
```

> see how load extension to chrome in Guide part

### build

```
npm run build
```

## Q&A

* Q1 - How to load extension to chrome?

  Open `Setting->Extenstion->Load unpack extenstion`

  Then, Load `dist` directory

  or Check this [video](https://www.notion.so/Chrome-Extentions-23d3afc128644457bfb08022713fe2b1#20aadfedc6cc4b32b6979decbea644ea)

* Q2 - How to management dom?

  ```js
  const main = document.querySelector('#main')
  const p = document.createElement('p')
  p.innerText = 'this is p'
  main.appendChild(p)
  ```

* Q3 - How to use axios in chrome-extenstion

  ```js
  // in content.ts
  document.addEventListener('click', (e: any) => {
    axios.get('https://www.google.com')
      .then(res => {
        console.log(res)
      })
  })
  ```
* Q4 - How to inject css to with content scripts ? - **See it in manifest.json**

* Q5 - How to use third-party `.css` or `.js` files in popup.html

  ```json
  {
    // ...other config in manifes.json
    "content_security_policy": "script-src 'self' https://code.getmdl.io/1.3.0/material.min.js 'self'; object-src 'self'",
  }
  ```

* Q6 - How to publish - see this [video](https://www.youtube.com/watch?v=DpdYTAhDWbs)

* Q7 - How to switch to different ctx mode ? 

    check [#custom section]((#different-ctx-type))