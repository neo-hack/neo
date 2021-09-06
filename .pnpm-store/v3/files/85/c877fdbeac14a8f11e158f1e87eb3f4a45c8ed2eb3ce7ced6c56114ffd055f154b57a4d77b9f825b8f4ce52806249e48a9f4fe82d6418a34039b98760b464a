"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const coreRule = utils_1.getCoreRule("array-bracket-spacing");
exports.default = utils_1.createRule("flow-sequence-bracket-spacing", {
    meta: {
        docs: {
            description: "enforce consistent spacing inside flow sequence brackets",
            categories: ["standard"],
            extensionRule: "array-bracket-spacing",
        },
        fixable: coreRule.meta.fixable,
        schema: coreRule.meta.schema,
        messages: coreRule.meta.messages,
        type: coreRule.meta.type,
    },
    create(context) {
        if (!context.parserServices.isYAML) {
            return {};
        }
        return utils_1.defineWrapperListener(coreRule, context, {
            options: context.options,
            createListenerProxy(listener) {
                return {
                    YAMLSequence(node) {
                        if (node.style === "flow") {
                            listener.ArrayExpression(utils_1.getProxyNode(node, {
                                type: "ArrayExpression",
                                get elements() {
                                    return node.entries;
                                },
                            }));
                        }
                    },
                };
            },
        });
    },
});
