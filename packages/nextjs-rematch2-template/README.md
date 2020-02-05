# @aiou/nextjs-rematch2-template
> nextjs quick start

[![npm](https://img.shields.io/npm/v/@aiou/nextjs-rematch2-template?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/nextjs-rematch2-template)

## For Stater
> i am a stater

1. 在`api route`和`server`之间是两个服务器的问题，所以也就没有`CORS`问题。同样发生在`getInitialProps`在服务端执行的时候发生的情况。可以把`api route`理解为约定式的，简化版本的`express sever`。`nextjs`也提供`api route`之外的[custom-route](https://nextjs.org/docs/#custom-server-and-routing)的方式

## Q&A

1. `pages/api`
   
   `getInitialProps`中请求`baseUrl`为`''`（在开发模式下就是`localhost:port`）的时候会请求到`pages/api` (无论是通过`<Link />`打开还是通过`url`刷新)。如果我们需要向`backend api`去请求一些数据的话，那么对于 **请求`baseUrl`不为`''`（在开发模式下不是`localhost:port`）** 这些接口就请求到真正的服务端。

   例如，假设前端页面是`www.a.com`。`baseUrl`为`''`情况下，请求地址为`a.com/xxx`，无论`getInitialProps`是在`server`执行还是前端执行，此时不会出现`cors`问题；如果`baseUrl`不为`''`情况下，那么就会请求真正的服务器，而不是`api route`构建的简单服务器，这种情况下就会可能出现`cors`问题。（或者说`cors`是需要而且解决的问题）

2. `proxy`
   
   如果在`server.js`启用了代理。那么就不会将请求指向`pages/api`

3. `tabs route`

   在`react`一个很简单的实现为`nested route`，也就是在`/parent/child1`和`/parent/child2`路由下，有一部分组件是固定不变的，只有部分`child route`在变化。但是`nestjs`中好像没有办法通过相同的方式实现。这种需求的普遍做法为

   构造一个公用组件`<Common />`。在`parent/child1`为

   ```tsx
   <Common>
    child1
   </Common>
   ```
   
   在`parent/child2`为

   ```tsx
   <Common>
    child2
   </Common>
   ```

4. `route based modal` - `modal`和某个路由绑定（或者说通过`path`控制`modal visiable`）。`react-router`实现这种方式官方有个`modal gallery`的例子。`nextjs`好像没有办法修改`route`渲染结构，也就没有办法实现。
   
    `nextjs`实现方式官网`showcase`就是这个[方式](https://github.com/zeit/next-site/tree/master/pages/showcase)。但是局限性在于只能在当前父类页面打开`modal`。例如`parent/modal`是`modal page`。那么：

      - 在`parent`下点击`parent/modal`可以实现打开`modal`同时，`modal`背后显示的是`parent page`
      - 在其余页面下点击`parent/modal`。那么会跳转到`parent`页面，并打开`parent/modal`

    但是`react-router`官网例子能够做到更多，例如在**a页面下点击`parent/modal`。那么会跳转到`parent`页面，并打开`parent/modal`**。会直接打开`parent/modal`，其背后显示的还是`a`页面。

    那么如何在`nextjs`下实现这个功能？在官网不支持`routes config`情况下，首先`modal page`是全局的组件，即`/`下进行控制。可以选择写在`_app.tsx`下。(假设`parent/modal`显示为`modal`逻辑为通过`<Link />`点击打开的是`modal`，链接直接复制到`url`里面的为普通页面)

    **这部分逻辑没有实践过..** `parent/modal` - 在`state = modal`下，`parent/modal.tsx`组件不显示。显示的为`_app`下对应的`parent/modal.tsx`组件。

    ```tsx
    <Modal>xx</Modal>
    ```

5. 移动端适配 - https://github.com/JiangWeixian/templates/issues/49