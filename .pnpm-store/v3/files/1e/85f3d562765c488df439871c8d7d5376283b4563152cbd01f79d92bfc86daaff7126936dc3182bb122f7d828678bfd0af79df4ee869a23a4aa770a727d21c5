"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHarmonyFactory = void 0;
const ts_type_conversion_1 = require("./ts-type-conversion");
// endregion
/* ****************************************************************************************************************** */
// region: Utilities
/* ****************************************************************************************************************** */
/**
 * Creates a node factory compatible with TS v3+
 */
function createHarmonyFactory(context) {
    var _a;
    const { tsThreeInstance } = context;
    return new Proxy((_a = context.tsFactory) !== null && _a !== void 0 ? _a : context.tsInstance, {
        get(target, prop) {
            if (context.tsFactory)
                return target[prop];
            switch (prop) {
                case "updateCallExpression":
                    return (...args) => tsThreeInstance.updateCall.apply(void 0, args);
                case "updateImportClause":
                    return function (node, isTypeOnly, name, namedBindings) {
                        return tsThreeInstance.updateImportClause.apply(void 0, ts_type_conversion_1.downSampleTsTypes(node, name, namedBindings));
                    };
                case "updateExportDeclaration":
                    return function (node, decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier) {
                        const [dsNode, dsModuleSpecifier, dsExportClause] = ts_type_conversion_1.downSampleTsTypes(node, moduleSpecifier, exportClause);
                        return tsThreeInstance.updateExportDeclaration(dsNode, dsNode.decorators, dsNode.modifiers, dsExportClause, dsModuleSpecifier, 
                        // @ts-ignore - This was added in later versions of 3.x
                        dsNode.isTypeOnly);
                    };
                default:
                    return (...args) => tsThreeInstance[prop](...args);
            }
        },
    });
}
exports.createHarmonyFactory = createHarmonyFactory;
// endregion
