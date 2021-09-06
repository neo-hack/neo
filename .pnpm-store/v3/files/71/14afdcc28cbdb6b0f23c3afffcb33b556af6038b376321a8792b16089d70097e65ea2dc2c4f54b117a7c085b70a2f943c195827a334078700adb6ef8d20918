"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const coreRule = utils_1.getCoreRule("no-floating-decimal");
exports.default = utils_1.createRule("no-floating-decimal", {
    meta: {
        docs: {
            description: "disallow leading or trailing decimal points in numeric literals",
            recommended: ["json", "jsonc"],
            extensionRule: true,
            layout: true,
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
