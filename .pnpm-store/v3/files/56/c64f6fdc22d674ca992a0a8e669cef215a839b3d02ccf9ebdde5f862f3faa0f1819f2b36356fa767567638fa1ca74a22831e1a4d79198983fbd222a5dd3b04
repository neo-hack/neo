"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var typescript_1 = __importDefault(require("typescript"));
var url_1 = __importDefault(require("url"));
function transformer(program, config) {
    var _a;
    var compilerOptions = program.getCompilerOptions();
    var extensions = (_a = config.extensions) !== null && _a !== void 0 ? _a : {};
    return function (context) { return function (sourceFile) {
        var factory = context.factory;
        var fileName = sourceFile.fileName;
        var fileDir = typescript_1.default.normalizePath(path_1.default.dirname(fileName));
        return typescript_1.default.visitEachChild(sourceFile, visit, context);
        /**
         * Visit and replace nodes with module specifiers
         */
        function visit(node) {
            // - Update `require()` or `import()`
            if (isRequire(node) || isAsyncImport(node)) {
                return update(node, node.arguments[0].text, function (_path) {
                    var _a;
                    var res = (_a = factory === null || factory === void 0 ? void 0 : factory.updateCallExpression(node, node.expression, node.typeArguments, [_path])) !== null && _a !== void 0 ? _a : typescript_1.default.updateCall(node, node.expression, node.typeArguments, [_path]);
                    var textNode = node.arguments[0];
                    var commentRanges = typescript_1.default.getLeadingCommentRanges(textNode.getFullText(), 0) || [];
                    for (var _i = 0, commentRanges_1 = commentRanges; _i < commentRanges_1.length; _i++) {
                        var range = commentRanges_1[_i];
                        var kind = range.kind, pos = range.pos, end = range.end, hasTrailingNewLine = range.hasTrailingNewLine;
                        var caption = textNode
                            .getFullText()
                            .substr(pos, end)
                            .replace(
                        /* searchValue */ kind === typescript_1.default.SyntaxKind.MultiLineCommentTrivia
                            ? // Comment range in a multi-line comment with more than one line erroneously includes the
                                // node's text in the range. For that reason, we use the greedy selector in capture group
                                // and dismiss anything after the final comment close tag
                                /^\/\*(.+)\*\/.*/s
                            : /^\/\/(.+)/s, 
                        /* replaceValue */ '$1');
                        typescript_1.default.addSyntheticLeadingComment(_path, kind, caption, hasTrailingNewLine);
                    }
                    return res;
                });
            }
            // - Update `ExternalModuleReference`, e.g., `import foo = require('foo');`
            if ((typescript_1.default.isImportDeclaration(node) || typescript_1.default.isExportDeclaration(node)) &&
                node.moduleSpecifier &&
                typescript_1.default.isStringLiteral(node.moduleSpecifier)) {
                return update(node, node.moduleSpecifier.text, function (_path) {
                    return factory
                        ? Object.assign(node, { moduleSpecifier: _path })
                        : Object.assign(node, { moduleSpecifier: typescript_1.default.updateNode(_path, node.moduleSpecifier) });
                });
            }
            // - Update `ImportTypeNode`, e.g., `typeof import('./bar');`
            if (typescript_1.default.isImportTypeNode(node)) {
                var argument_1 = node.argument;
                if (!typescript_1.default.isStringLiteral(argument_1.literal))
                    return node;
                var text = argument_1.literal.text;
                return !text
                    ? node
                    : update(node, text, function (_path) {
                        var _a;
                        return ((_a = factory === null || factory === void 0 ? void 0 : factory.updateImportTypeNode(node, factory.updateLiteralTypeNode(argument_1, _path), node.qualifier, node.typeArguments, node.isTypeOf)) !== null && _a !== void 0 ? _a : typescript_1.default.updateImportTypeNode(node, typescript_1.default.updateLiteralTypeNode(argument_1, _path), node.qualifier, node.typeArguments, node.isTypeOf));
                    });
            }
            return typescript_1.default.visitEachChild(node, visit, context);
        }
        function update(original, moduleName, updaterFn) {
            // - Have Compiler API attempt to resolve
            var _a = typescript_1.default.resolveModuleName(moduleName, fileName, compilerOptions, typescript_1.default.sys), failedLookupLocations = _a.failedLookupLocations, resolvedModule = _a.resolvedModule;
            var _path;
            if (!resolvedModule) {
                var maybeUrl = failedLookupLocations[0];
                if (!isUrl(maybeUrl))
                    return original;
                _path = maybeUrl;
            }
            else if (resolvedModule.isExternalLibraryImport) {
                return original;
            }
            else {
                var extension = resolvedModule.extension, resolvedFileName = resolvedModule.resolvedFileName;
                var filePath = fileDir;
                var modulePath = path_1.default.dirname(resolvedFileName);
                _path = typescript_1.default.normalizePath(path_1.default.join(path_1.default.relative(filePath, modulePath), path_1.default.basename(resolvedFileName)));
                if (extension && extension in extensions) {
                    _path = _path.replace(extension, extensions[extension]);
                }
                if (!_path)
                    return original;
                _path = _path[0] === "." ? _path : "./" + _path;
            }
            return updaterFn(typescript_1.default.createLiteral(_path));
        }
    }; };
}
exports.default = transformer;
// * ==========================================================================
// * Helpers
// * ==========================================================================
//#region Helpers
function isUrl(target) {
    return !!target && (!!url_1.default.parse(target).host || !!url_1.default.parse(target).hostname);
}
function isRequire(node) {
    return (typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === 'require' &&
        typescript_1.default.isStringLiteral(node.arguments[0]) &&
        node.arguments.length === 1);
}
function isAsyncImport(node) {
    return (typescript_1.default.isCallExpression(node) &&
        node.expression.kind === typescript_1.default.SyntaxKind.ImportKeyword &&
        typescript_1.default.isStringLiteral(node.arguments[0]) &&
        node.arguments.length === 1);
}
//#endregion
//# sourceMappingURL=main.js.map