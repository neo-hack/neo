"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Named = _styledComponents["default"].div(["\n  width: 100%;\n  &:hover {\n    width: 50%;\n  }\n"]);

var NamedWithInterpolation = _styledComponents["default"].div(["\n  color: ", "&:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(59, 130, 246, var(--tw-bg-opacity));\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n& {\n  height: 100vh;\n  margin: 0px;\n  overflow: hidden;\n  padding: 0px;\n  width: 100vw;\n}"], function (color) {
  return props.color;
});

var Wrapped = (0, _styledComponents["default"])(Inner)(["color: red;\nheight: 100vh;\nmargin: 0px;\noverflow: hidden;\npadding: 0px;\nwidth: 100vw;"]);

var Foo = _styledComponents["default"].div({
  color: 'green'
});

var style = (0, _styledComponents.css)(["\n  background: green;\n"]);
var GlobalStyle = (0, _styledComponents.createGlobalStyle)(["\n  html {\n    background: silver;\n  }\n"]);
