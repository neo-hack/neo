"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const coreRule = utils_1.getCoreRule("no-octal");
exports.default = utils_1.createRule("no-octal", {
    meta: {
        docs: {
            description: "disallow legacy octal literals",
            recommended: null,
            extensionRule: true,
            layout: false,
        },
        fixable: coreRule.meta.fixable,
        schema: coreRule.meta.schema,
        messages: coreRule.meta.messages,
        type: coreRule.meta.type,
    },
    create(context) {
        return utils_1.defineWrapperListener(coreRule, context, context.options);
    },
});
