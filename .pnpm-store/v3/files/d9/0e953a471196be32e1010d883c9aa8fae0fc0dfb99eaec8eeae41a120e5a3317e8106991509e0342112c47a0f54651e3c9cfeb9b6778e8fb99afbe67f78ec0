"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const utils_1 = require("./utils");
const visitor_1 = require("./visitor");
const harmony_factory_1 = require("./utils/harmony-factory");
const minimatch_1 = require("minimatch");
/* ****************************************************************************************************************** *
 * Transformer
 * ****************************************************************************************************************** */
function transformer(program, config, { ts: tsInstance }) {
    var _a;
    if (!tsInstance)
        tsInstance = typescript_1.default;
    const compilerOptions = program.getCompilerOptions();
    const rootDirs = (_a = compilerOptions.rootDirs) === null || _a === void 0 ? void 0 : _a.filter(path_1.default.isAbsolute);
    return (transformationContext) => {
        var _a, _b, _c;
        const pathsBasePath = (_a = compilerOptions.pathsBasePath) !== null && _a !== void 0 ? _a : compilerOptions.baseUrl;
        if (!pathsBasePath || !compilerOptions.paths)
            return (sourceFile) => sourceFile;
        const { configFile, paths } = compilerOptions;
        // TODO - Remove typecast when tryParsePatterns is recognized (probably after ts v4.4)
        const { tryParsePatterns } = tsInstance;
        const tsTransformPathsContext = {
            compilerOptions,
            config,
            elisionMap: new Map(),
            tsFactory: transformationContext.factory,
            program,
            rootDirs,
            transformationContext,
            tsInstance,
            pathsBasePath,
            emitHost: transformationContext.getEmitHost(),
            getCanonicalFileName: tsInstance.createGetCanonicalFileName(tsInstance.sys.useCaseSensitiveFileNames),
            tsThreeInstance: utils_1.cast(tsInstance),
            excludeMatchers: (_b = config.exclude) === null || _b === void 0 ? void 0 : _b.map((globPattern) => new minimatch_1.Minimatch(globPattern, { matchBase: true })),
            outputFileNamesCache: new Map(),
            // Get paths patterns appropriate for TS compiler version
            pathsPatterns: tryParsePatterns
                ? // TODO - Remove typecast when pathPatterns is recognized (probably after ts v4.4)
                    ((_c = configFile === null || configFile === void 0 ? void 0 : configFile.configFileSpecs) === null || _c === void 0 ? void 0 : _c.pathPatterns) || tryParsePatterns(paths)
                : tsInstance.getOwnKeys(paths),
        };
        if (!tsTransformPathsContext.emitHost)
            throw new Error(`typescript-transform-paths >= 3.1.0 requires an EmitHost in the TransformationContext to resolve properly.` +
                ` Make sure you're using either ts-patch or ttypescript.`);
        return (sourceFile) => {
            const visitorContext = Object.assign(Object.assign({}, tsTransformPathsContext), { sourceFile, isDeclarationFile: sourceFile.isDeclarationFile, originalSourceFile: tsInstance.getOriginalSourceFile(sourceFile), getVisitor() {
                    return visitor_1.nodeVisitor.bind(this);
                }, factory: harmony_factory_1.createHarmonyFactory(tsTransformPathsContext) });
            return tsInstance.visitEachChild(sourceFile, visitorContext.getVisitor(), transformationContext);
        };
    };
}
exports.default = transformer;
