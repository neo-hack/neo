"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePathAndUpdateNode = void 0;
const general_utils_1 = require("./general-utils");
const ts_helpers_1 = require("./ts-helpers");
const resolve_module_name_1 = require("./resolve-module-name");
/* ****************************************************************************************************************** */
// region: Node Updater Utility
/* ****************************************************************************************************************** */
/**
 * Gets proper path and calls updaterFn to get the new node if it should be updated
 */
function resolvePathAndUpdateNode(context, node, moduleName, updaterFn) {
    const { sourceFile, tsInstance, factory } = context;
    const { normalizePath } = tsInstance;
    /* Handle JSDoc statement tags */
    const tags = getStatementTags();
    // Skip if @no-transform-path specified
    if (tags.shouldSkip)
        return node;
    // Accommodate direct override via @transform-path tag
    if (tags.overridePath) {
        const transformedPath = !general_utils_1.isURL(tags.overridePath)
            ? general_utils_1.maybeAddRelativeLocalPrefix(normalizePath(tags.overridePath))
            : tags.overridePath;
        return updaterFn(factory.createStringLiteral(transformedPath));
    }
    /* Resolve Module */
    // Skip if no paths match found
    if (!ts_helpers_1.isModulePathsMatch(context, moduleName))
        return node;
    const res = resolve_module_name_1.resolveModuleName(context, moduleName);
    if (!res)
        return node;
    const { outputPath, resolvedPath } = res;
    /* Skip if matches exclusion */
    if (context.excludeMatchers)
        for (const matcher of context.excludeMatchers)
            if (matcher.match(outputPath) || (resolvedPath && matcher.match(resolvedPath)))
                return node;
    return updaterFn(factory.createStringLiteral(outputPath));
    /* ********************************************************* *
     * Helpers
     * ********************************************************* */
    function getStatementTags() {
        var _a, _b, _c;
        let targetNode = tsInstance.isStatement(node)
            ? node
            : (_a = tsInstance.findAncestor(node, tsInstance.isStatement)) !== null && _a !== void 0 ? _a : node;
        targetNode = tsInstance.getOriginalNode(targetNode);
        let jsDocTags;
        try {
            jsDocTags = tsInstance.getJSDocTags(targetNode);
        }
        catch (_d) { }
        const commentTags = new Map();
        try {
            const trivia = targetNode.getFullText(sourceFile).slice(0, targetNode.getLeadingTriviaWidth(sourceFile));
            const regex = /^\s*\/\/\/?\s*@(transform-path|no-transform-path)(?:[^\S\r\n](.+?))?$/gm;
            for (let match = regex.exec(trivia); match; match = regex.exec(trivia))
                commentTags.set(match[1], match[2]);
        }
        catch (_e) { }
        return {
            overridePath: (_b = commentTags.get("transform-path")) !== null && _b !== void 0 ? _b : (_c = jsDocTags === null || jsDocTags === void 0 ? void 0 : jsDocTags.find((t) => t.tagName.text.toLowerCase() === "transform-path")) === null || _c === void 0 ? void 0 : _c.comment,
            shouldSkip: commentTags.has("no-transform-path") ||
                !!(jsDocTags === null || jsDocTags === void 0 ? void 0 : jsDocTags.find((t) => t.tagName.text.toLowerCase() === "no-transform-path")),
        };
    }
}
exports.resolvePathAndUpdateNode = resolvePathAndUpdateNode;
// endregion
