'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _cssLoader = require('css-loader');

var _cssLoader2 = _interopRequireDefault(_cssLoader);

var _locals = require('css-loader/locals');

var _locals2 = _interopRequireDefault(_locals);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

require('colour');

var _cssModuleToInterface = require('./cssModuleToInterface');

var _persist = require('./persist');

var persist = _interopRequireWildcard(_persist);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function delegateToCssLoader(ctx, input, callback) {
  ctx.async = function () {
    return callback;
  };
  _cssLoader2.default.call.apply(_cssLoader2.default, [ctx].concat(_toConsumableArray(input)));
}

module.exports = function () {
  var _this = this;

  for (var _len = arguments.length, input = Array(_len), _key = 0; _key < _len; _key++) {
    input[_key] = arguments[_key];
  }

  if (this.cacheable) this.cacheable();

  // mock async step 1 - css loader is async, we need to intercept this so we get async ourselves
  var callback = this.async();

  var query = _loaderUtils2.default.parseQuery(this.query);
  var logger = (0, _logger2.default)(query.silent);

  var moduleMode = query.modules || query.module;
  if (!moduleMode) {
    logger('warn', 'Typings for CSS-Modules: option `modules` is not active - skipping extraction work...'.red);
    return delegateToCssLoader(this, input, callback);
  }

  // mock async step 2 - offer css loader a "fake" callback
  this.async = function () {
    return function (err, content) {
      if (err) {
        return callback(err);
      }
      var filename = _this.resourcePath;
      var cssModuleInterfaceFilename = (0, _cssModuleToInterface.filenameToTypingsFilename)(filename);

      var keyRegex = /"([^\\"]+)":/g;
      var match = void 0;
      var cssModuleKeys = [];

      while (match = keyRegex.exec(content)) {
        if (cssModuleKeys.indexOf(match[1]) < 0) {
          cssModuleKeys.push(match[1]);
        }
      }

      var cssModuleDefinition = void 0;
      if (!query.namedExport) {
        cssModuleDefinition = (0, _cssModuleToInterface.generateGenericExportInterface)(cssModuleKeys, filename);
      } else {
        var _filterNonWordClasses = (0, _cssModuleToInterface.filterNonWordClasses)(cssModuleKeys),
            _filterNonWordClasses2 = _slicedToArray(_filterNonWordClasses, 2),
            cleanedDefinitions = _filterNonWordClasses2[0],
            skippedDefinitions = _filterNonWordClasses2[1];

        if (skippedDefinitions.length > 0 && !query.camelCase) {
          logger('warn', ('Typings for CSS-Modules: option \'namedExport\' was set but \'camelCase\' for the css-loader not.\nThe following classes will not be available as named exports:\n' + skippedDefinitions.map(function (sd) {
            return ' - "' + sd + '"';
          }).join('\n').red + '\n').yellow);
        }

        var _filterReservedWordCl = (0, _cssModuleToInterface.filterReservedWordClasses)(cleanedDefinitions),
            _filterReservedWordCl2 = _slicedToArray(_filterReservedWordCl, 2),
            nonReservedWordDefinitions = _filterReservedWordCl2[0],
            reservedWordDefinitions = _filterReservedWordCl2[1];

        if (reservedWordDefinitions.length > 0) {
          logger('warn', ('Your css contains classes which are reserved words in JavaScript.\nConsequently the following classes will not be available as named exports:\n' + reservedWordDefinitions.map(function (rwd) {
            return ' - "' + rwd + '"';
          }).join('\n').red + '\nThese can be accessed using the object literal syntax; eg styles[\'delete\'] instead of styles.delete.\n').yellow);
        }

        cssModuleDefinition = (0, _cssModuleToInterface.generateNamedExports)(nonReservedWordDefinitions);
      }
      if (cssModuleDefinition.trim() === '') {
        // Ensure empty CSS modules export something
        cssModuleDefinition = 'export {};\n';
      }
      if (query.banner) {
        // Prefix banner to CSS module
        cssModuleDefinition = query.banner + '\n' + cssModuleDefinition;
      }
      persist.writeToFileIfChanged(cssModuleInterfaceFilename, cssModuleDefinition);
      // mock async step 3 - make `async` return the actual callback again before calling the 'real' css-loader
      delegateToCssLoader(_this, input, callback);
    };
  };
  _locals2.default.call.apply(_locals2.default, [this].concat(input));
};