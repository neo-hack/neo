'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
    result['default'] = mod
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
/**
 * Generate folders in docs
 */
var ignore_config_1 = require('../config/ignore.config')
var docs_config_1 = require('../config/docs.config')
var isEmpty_1 = __importDefault(require('lodash/isEmpty'))
var fs = __importStar(require('fs'))
var DEFAULT_SUPPORT_LEVEL = 1
var FolderGenerator = /** @class */ (function () {
  function FolderGenerator(props) {
    var _this = this
    this.ignoreFolders = ignore_config_1.ignoreFolders
    this.folderPath = docs_config_1.rootPath
    this.folders = []
    this.level = DEFAULT_SUPPORT_LEVEL
    this.getFolders = function (currentLevel, force) {
      if (currentLevel === void 0) {
        currentLevel = 1
      }
      if (force === void 0) {
        force = false
      }
      if (!isEmpty_1.default(_this.folders) && !force) {
        return _this.folders
      }
      // reset folders to empty
      if (currentLevel === 1) {
        _this.folders = []
      }
      var folders = []
      var _folders = fs.readdirSync(_this.folderPath)
      _folders.forEach(function (e) {
        var isDir = _this.isDir(e)
        if (!isDir) {
          folders.push(_this.getFolder(e, false))
        }
        var isVaild = isDir && !_this.ignoreFolders.includes(e)
        if (isVaild) {
          var entry = _this.getFolder(e, true)
          var key = Object.keys(entry)[0] // child folder path
          var _folderPath = _this.folderPath
          _this.folderPath = key // change travel folder path
          if (_this.level !== 'all' && _this.level <= currentLevel) {
            folders.push(entry)
          }
          entry[key] = _this.getFolders(currentLevel + 1, true)
          _this.folderPath = _folderPath // reset folderpath to original
        }
      })
      return folders
    }
    this.getFolder = function (baseName, isDir) {
      var _a
      if (isDir === void 0) {
        isDir = false
      }
      var key = _this.folderPath + '/' + baseName
      return isDir ? ((_a = {}), (_a[key] = []), _a) : key
    }
    this.isDir = function (baseName) {
      var _value = _this.folderPath + '/' + baseName
      return !!(_value && fs.lstatSync(_value).isDirectory())
    }
    this.ignoreFolders =
      props && props.ignoreFolders ? props.ignoreFolders : ignore_config_1.ignoreFolders
    this.folderPath = props && props.folderPath ? props.folderPath : docs_config_1.rootPath
    this.level = props && props.level ? props.level : DEFAULT_SUPPORT_LEVEL
  }
  return FolderGenerator
})()
exports.default = FolderGenerator
// pass
// const Generator = new FolderGenerator()
// const x = Generator.getFolders()[1] as { [key: string]: Folders }
// const y = x['/home/eric/Documents/WebstormProjects/templates/docs/examples'][1] as { [key: string]: Folders }
// console.log(y['/home/eric/Documents/WebstormProjects/templates/docs/examples/a'][0])
