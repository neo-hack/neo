"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const coreRule = utils_1.getCoreRule("no-sparse-arrays");
exports.default = utils_1.createRule("no-sparse-arrays", {
    meta: {
        docs: {
            description: "disallow sparse arrays",
            recommended: ["json", "jsonc", "json5"],
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
