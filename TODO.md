## TODO

* [x] - 是否有必要加入`immer`而不是使用`spread`语法。
    > 好像没有必要。`spread`方法够用了，解决的也是类似的问题。
* [x] - how-to-listen-route-inreact
    * [ref-不使用react-router-redux](https://div.io/topic/2073)
* [x] - 类如`watch`钩子函数好像不需要实现，应该可以通过`shouldComponentUpdate`监听state变化然后做出相应的改变。而 **watch函数最想要的不触发`render`，可以通过对应的在该生命周期中返回`false`实现。**
* [x] - subscripes history change
* [x] - css-modules
* [x] - redux promise / 好像本身就是支持的2
* [x] - redux-dev-tools / 默认就是带的devtools支持
* [ ] - add filename as prefix in css-classname
* [ ] - 优化webpack加载速度通过设置`entry`。
  * 或许你需要了解`webpack`是如何解析依赖的（指的是是否可以利用它的第三方库）
  * 如果不需要利用第三方库，那么是否可以通过`webpack.config`排除那些跳过不需要的文件。
* [ ] - ~~react-cli~~
