"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const coreRule = utils_1.getCoreRule("object-curly-spacing");
exports.default = utils_1.createRule("flow-mapping-curly-spacing", {
    meta: {
        docs: {
            description: "enforce consistent spacing inside braces",
            categories: ["standard"],
            extensionRule: "object-curly-spacing",
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
                    YAMLMapping(node) {
                        if (node.style === "flow") {
                            listener.ObjectExpression(utils_1.getProxyNode(node, {
                                type: "ObjectExpression",
                                get properties() {
                                    return node.pairs;
                                },
                            }));
                        }
                    },
                };
            },
        });
    },
});
