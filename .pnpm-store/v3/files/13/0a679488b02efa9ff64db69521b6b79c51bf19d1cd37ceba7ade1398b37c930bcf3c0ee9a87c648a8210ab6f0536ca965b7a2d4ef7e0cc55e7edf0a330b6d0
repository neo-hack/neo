"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModulePathsMatch = exports.getOutputDirForSourceFile = void 0;
const path_1 = __importDefault(require("path"));
/* ****************************************************************************************************************** */
// region: TS Helpers
/* ****************************************************************************************************************** */
/**
 * Determine output file path for source file
 */
function getOutputDirForSourceFile(context, sourceFile) {
    const { tsInstance, emitHost, outputFileNamesCache, compilerOptions, tsInstance: { getOwnEmitOutputFilePath, getOutputExtension }, } = context;
    if (outputFileNamesCache.has(sourceFile))
        return outputFileNamesCache.get(sourceFile);
    const outputPath = getOwnEmitOutputFilePath(sourceFile.fileName, emitHost, getOutputExtension(sourceFile, compilerOptions));
    if (!outputPath)
        throw new Error(`Could not resolve output path for ${sourceFile.fileName}. Please report a GH issue at: ` +
            `https://github.com/LeDDGroup/typescript-transform-paths/issues`);
    const res = path_1.default.dirname(outputPath);
    outputFileNamesCache.set(sourceFile, res);
    return tsInstance.normalizePath(res);
}
exports.getOutputDirForSourceFile = getOutputDirForSourceFile;
/**
 * Determine if moduleName matches config in paths
 */
function isModulePathsMatch(context, moduleName) {
    const { pathsPatterns, tsInstance: { matchPatternOrExact }, } = context;
    // TODO - Remove typecast after ts v4.4
    return !!matchPatternOrExact(pathsPatterns, moduleName);
}
exports.isModulePathsMatch = isModulePathsMatch;
// endregion
