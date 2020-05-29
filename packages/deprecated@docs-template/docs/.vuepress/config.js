'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var router_1 = __importDefault(require('../utils/router'))
var project_constants_1 = require('../constants/project.constants')
module.exports = {
  title: 'JS-Tips',
  base: project_constants_1.REPO_NAME ? '/' + project_constants_1.REPO_NAME + '/' : undefined,
  description: 'Please input Description',
  head: [['link', { rel: 'icon', href: '/favicon.png', type: 'image/x-icon' }]],
  themeConfig: {
    nav: [
      { text: 'HomePage', link: '/' },
      { text: 'Guide', link: '/Guide/' },
      { text: 'Menus', link: '/Menus/' },
      { text: 'Github', link: 'Please input repo link' },
    ],
    sidebar: __assign({}, router_1.default.routes),
    lastUpdated: true,
    serviceWorker: {
      updatePopup: {
        message: '发现更新🎉',
        button: '刷新',
      },
    },
  },
  markdown: {
    config: function (md) {
      md.use(require('markdown-it-task-checkbox'))
    },
  },
}
