"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const coreRule = utils_1.getCoreRule("space-unary-ops");
exports.default = utils_1.createRule("space-unary-ops", {
    meta: {
        docs: {
            description: "disallow spaces after unary operators",
            recommended: ["json", "jsonc", "json5"],
            extensionRule: true,
            layout: true,
        },
        fixable: coreRule.meta.fixable,
        schema: coreRule.meta.schema,
        messages: coreRule.meta.messages,
        type: coreRule.meta.type,
    },
    create(context) {
        return utils_1.defineWrapperListener(coreRule, context, [{ nonwords: false }]);
    },
});
