"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (silent) {
  if (silent) {
    return function () {};
  }
  return function (level) {
    var _console;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_console = console)[level].apply(_console, args);
  };
};