'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractCssModuleFromSource = exports.removeLoadersBeforeCssLoader = exports.filterCssModules = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _vm = require('vm');

var _vm2 = _interopRequireDefault(_vm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCssModule = function isCssModule(module) {
  if (!module || typeof module.request !== 'string') {
    return false;
  }

  var extname = _path2.default.extname(module.request);
  return (/\/css-loader\//.test(module.request) && extname !== '.js'
  );
};

var filterCssModules = exports.filterCssModules = function filterCssModules(modules) {
  return modules.filter(isCssModule);
};

var removeLoadersBeforeCssLoader = exports.removeLoadersBeforeCssLoader = function removeLoadersBeforeCssLoader(loaders) {
  var sawCssLoader = false;
  // remove all loaders before the css-loader
  return loaders.filter(function (loader) {
    if (loader.indexOf('/css-loader/') > -1) {
      sawCssLoader = true;
    }

    return sawCssLoader;
  });
};

var extractCssModuleFromSource = exports.extractCssModuleFromSource = function extractCssModuleFromSource(source) {
  var sandbox = {
    exports: null,
    module: {},
    require: function require() {
      return function () {
        return [];
      };
    }
  };
  var script = new _vm2.default.Script(source);
  var context = new _vm2.default.createContext(sandbox);
  script.runInContext(context);
  return sandbox.exports.locals;
};