'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeToFileIfChanged = undefined;

var _gracefulFs = require('graceful-fs');

var _gracefulFs2 = _interopRequireDefault(_gracefulFs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var writeToFileIfChanged = exports.writeToFileIfChanged = function writeToFileIfChanged(filename, content) {
  if (_gracefulFs2.default.existsSync(filename)) {
    var currentInput = _gracefulFs2.default.readFileSync(filename, 'utf-8');

    if (currentInput !== content) {
      writeFile(filename, content);
    }
  } else {
    writeFile(filename, content);
  }
};

var writeFile = function writeFile(filename, content) {
  //Replace new lines with OS-specific new lines
  content = content.replace(/\n/g, _os2.default.EOL);

  _gracefulFs2.default.writeFileSync(filename, content, 'utf8');
};