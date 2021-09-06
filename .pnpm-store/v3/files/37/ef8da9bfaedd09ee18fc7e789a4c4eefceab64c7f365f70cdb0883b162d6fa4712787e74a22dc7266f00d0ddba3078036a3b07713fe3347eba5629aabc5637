'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateGenericExportInterface = exports.generateNamedExports = exports.filenameToTypingsFilename = exports.filterReservedWordClasses = exports.filterNonWordClasses = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filenameToInterfaceName = function filenameToInterfaceName(filename) {
  return _path2.default.basename(filename).replace(/^(\w)/, function (_, c) {
    return 'I' + c.toUpperCase();
  }).replace(/\W+(\w)/g, function (_, c) {
    return c.toUpperCase();
  });
};

var cssModuleToTypescriptInterfaceProperties = function cssModuleToTypescriptInterfaceProperties(cssModuleKeys) {
  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '  ';

  return cssModuleKeys.map(function (key) {
    return indent + '\'' + key + '\': string;';
  }).join('\n');
};

var cssModuleToNamedExports = function cssModuleToNamedExports(cssModuleKeys) {
  return cssModuleKeys.map(function (key) {
    return 'export const ' + key + ': string;';
  }).join('\n');
};

var allWordsRegexp = /^\w+$/i;
var filterNonWordClasses = exports.filterNonWordClasses = function filterNonWordClasses(cssModuleKeys) {
  var filteredClassNames = cssModuleKeys.filter(function (classname) {
    return allWordsRegexp.test(classname);
  });
  if (filteredClassNames.length === cssModuleKeys.length) {
    return [filteredClassNames, []];
  }
  var nonWordClassNames = cssModuleKeys.filter(function (classname) {
    return !allWordsRegexp.test(classname);
  });
  return [filteredClassNames, nonWordClassNames];
};

// Documented here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Reserved_keywords_as_of_ECMAScript_2015
var reservedWords = ['break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield'];
var filterReservedWordClasses = exports.filterReservedWordClasses = function filterReservedWordClasses(cssModuleKeys) {
  var filteredClassNames = cssModuleKeys.filter(function (classname) {
    return reservedWords.indexOf(classname) === -1;
  });
  if (filteredClassNames.length === cssModuleKeys.length) {
    return [filteredClassNames, []];
  }
  var reservedWordClassNames = cssModuleKeys.filter(function (classname) {
    return reservedWords.indexOf(classname) !== -1;
  });
  return [filteredClassNames, reservedWordClassNames];
};

var filenameToTypingsFilename = exports.filenameToTypingsFilename = function filenameToTypingsFilename(filename) {
  var dirName = _path2.default.dirname(filename);
  var baseName = _path2.default.basename(filename);
  return _path2.default.join(dirName, baseName + '.d.ts');
};

var generateNamedExports = exports.generateNamedExports = function generateNamedExports(cssModuleKeys) {
  var namedExports = cssModuleToNamedExports(cssModuleKeys);
  return namedExports + '\n';
};

var generateGenericExportInterface = exports.generateGenericExportInterface = function generateGenericExportInterface(cssModuleKeys, filename, indent) {
  var interfaceName = filenameToInterfaceName(filename);
  var interfaceProperties = cssModuleToTypescriptInterfaceProperties(cssModuleKeys, indent);
  return 'export interface ' + interfaceName + ' {\n' + interfaceProperties + '\n}\n\nexport const locals: ' + interfaceName + ';\n';
};