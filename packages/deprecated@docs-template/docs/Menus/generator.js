'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var fs_1 = __importDefault(require('fs'))
var path_1 = __importDefault(require('path'))
var router_1 = __importDefault(require('../utils/router'))
var DEFAULT_TEM_PATH = path_1.default.join(__dirname, 'template.md')
var Menus = /** @class */ (function () {
  function Menus(props) {
    var _this = this
    this.templatePath = DEFAULT_TEM_PATH
    this.loadTemplate = function (path) {
      if (path === void 0) {
        path = _this.templatePath
      }
      return fs_1.default.readFileSync(path).toString()
    }
    this.writeGuideReadme = function (fileName) {
      if (fileName === void 0) {
        fileName = 'README.md'
      }
      var menus = _this.createMenus()
      var template = _this.loadTemplate()
      var data = template + '\n' + menus
      fs_1.default.writeFileSync(__dirname + '/' + fileName, data)
    }
    this.createMenus = function () {
      var menus = Object.keys(router_1.default.routes).map(function (k) {
        return {
          url: k,
          text: k.replace(/\//g, ''),
        }
      })
      var lis = menus.map(function (e) {
        return _this.createLink(e.url, e.text)
      })
      return _this.createUL(lis)
    }
    this.createUL = function (lis) {
      return lis
        .map(function (e) {
          return _this.createLI(e)
        })
        .join('\n')
    }
    this.createLink = function (url, text) {
      return '[' + text + '](' + url + ')'
    }
    this.createLI = function (value) {
      return '* ' + value
    }
    this.templatePath = props && props.templatePath ? props.templatePath : DEFAULT_TEM_PATH
  }
  return Menus
})()
var menu = new Menus()
menu.writeGuideReadme()
