"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var project_constants_1 = require("../constants/project.constants");
var path_1 = require("path");
var isObject_1 = __importDefault(require("lodash/isObject"));
var isString_1 = __importDefault(require("lodash/isString"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var folder_1 = __importDefault(require("./folder"));
exports.createRouterUrl = function (url) {
    return "" + project_constants_1.BASE + url + "/";
};
var RouterGenerator = /** @class */ (function (_super) {
    __extends(RouterGenerator, _super);
    function RouterGenerator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.routes = {};
        /**
         * just remove abs folder path
         */
        _this.abs2rel = function (path, absPath) {
            if (absPath === void 0) { absPath = _this.folderPath; }
            return path.replace(absPath, '');
        };
        _this.hasChildRoutes = function (routes) {
            return isObject_1.default(routes);
        };
        _this.isRoute = function (fileName) {
            return path_1.extname(fileName).toLowerCase() === '.md';
        };
        _this.isIndexRoute = function (fileName) {
            return _this.isRoute(fileName) && path_1.basename(fileName).toLowerCase() === 'readme.md';
        };
        _this.getNormalRoute = function (route) {
            return route.replace(/\/([\S\s\/]+)\.md/ig, function (_, p1) {
                return p1;
            });
        };
        _this.getIndexRoute = function (route) {
            return route.replace(/([\S\s]*)\/readme\.md/i, function (match, p1) {
                var _p1 = p1.startsWith('/') ? p1.slice(1) : p1;
                return p1 ? _p1 : '';
            });
        };
        _this.getChildRoutes = function (folder, absPath) {
            var childRoutes = [];
            var relPath = '';
            if (isString_1.default(folder)) {
                relPath = _this.abs2rel(folder, absPath);
                if (_this.isIndexRoute(relPath)) {
                    childRoutes.push(_this.getIndexRoute(relPath));
                }
                else if (_this.isRoute(relPath)) {
                    childRoutes.push(_this.getNormalRoute(relPath));
                }
            }
            else {
                var key = Object.keys(folder)[0];
                var values = folder[key];
                values.forEach(function (v) {
                    childRoutes = childRoutes.concat(_this.getChildRoutes(v, absPath));
                });
            }
            return childRoutes.sort();
        };
        _this.getRoutes = function (force) {
            if (force === void 0) { force = false; }
            if (!isEmpty_1.default(_this.routes) && !force) {
                return _this.routes;
            }
            var folders = _this.getFolders();
            var routes = {};
            folders.forEach(function (f) {
                var hasChildRoutes = _this.hasChildRoutes(f);
                if (!hasChildRoutes) {
                    // do nothing
                }
                else {
                    var key = Object.keys(f)[0];
                    var firstLevelRoute = exports.createRouterUrl(_this.abs2rel(key, _this.folderPath + '/'));
                    var childrenRoutes = _this.getChildRoutes(f, key);
                    if (!isEmpty_1.default(childrenRoutes)) {
                        routes[firstLevelRoute] = childrenRoutes;
                    }
                }
            });
            _this.routes = routes;
            return routes;
        };
        return _this;
    }
    return RouterGenerator;
}(folder_1.default));
var Generator = new RouterGenerator();
Generator.getRoutes();
exports.default = Generator;
