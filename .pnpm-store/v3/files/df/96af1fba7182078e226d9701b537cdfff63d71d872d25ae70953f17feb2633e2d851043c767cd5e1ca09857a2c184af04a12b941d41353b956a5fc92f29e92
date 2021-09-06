"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
const typescript_1 = __importDefault(require("typescript"));
const COMMENTED_PATTERN = /(\/\*(?:(?!\*\/).|[\n\r])*\*\/)|(\/\/[^\n\r]*(?:[\n\r]+|$))/;
const IMPORT_PATTERNS = [
    /from (["'])(.*?)\1/g,
    /import\((["'])(.*?)\1\)/g,
    /require\((["'])(.*?)\1\)/g,
    /import\s+(["'])(.*?)\1/g,
];
function parseImports(file, dir) {
    return file.flatMap((line, index) => findImports(line).map((i) => ({ path: dir, index, import: i })));
}
function findImports(line) {
    line = line.replace(COMMENTED_PATTERN, '');
    return IMPORT_PATTERNS.flatMap((pattern) => [...line.matchAll(pattern)].map((match) => match[2]));
}
function resolveImports(file, imports, options) {
    const { baseUrl, paths, cwd } = options;
    const aliases = {};
    for (const alias in paths) {
        /* istanbul ignore else  */
        if (paths.hasOwnProperty(alias)) {
            let resolved = alias;
            if (alias.endsWith('/*')) {
                resolved = alias.replace('/*', '/');
            }
            aliases[resolved] = paths[alias];
        }
    }
    const lines = [...file];
    for (const imported of imports) {
        const line = file[imported.index];
        let resolved = '';
        for (const alias in aliases) {
            /* istanbul ignore else  */
            if (aliases.hasOwnProperty(alias) && imported.import.startsWith(alias)) {
                const choices = aliases[alias];
                if (choices !== undefined) {
                    resolved = choices[0];
                    if (resolved.endsWith('/*')) {
                        resolved = resolved.replace('/*', '/');
                    }
                    resolved = imported.import.replace(alias, resolved);
                    break;
                }
            }
        }
        if (resolved.length < 1) {
            continue;
        }
        const base = path_1.default.join(cwd, path_1.default.relative(cwd, baseUrl || './'));
        const current = path_1.default.relative(base, path_1.default.dirname(imported.path));
        const target = path_1.default.relative(base, resolved);
        const relative = path_1.default.relative(current, target).replace(/\\/g, '/');
        lines[imported.index] = line.replace(imported.import, relative);
    }
    return lines;
}
function resolveConfig(config, cwd) {
    if (!config) {
        let configPath;
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'test') {
            configPath = typescript_1.default.findConfigFile(cwd, typescript_1.default.sys.fileExists);
        }
        /* istanbul ignore else */
        if (!configPath) {
            throw new Error("Could not find a valid 'tsconfig.json'");
        }
        else {
            const configFile = typescript_1.default.readConfigFile(configPath, typescript_1.default.sys.readFile);
            const { options } = typescript_1.default.parseJsonConfigFileContent(configFile.config, typescript_1.default.sys, cwd);
            return options;
        }
    }
    if (typeof config === 'string') {
        const configFile = typescript_1.default.readConfigFile(config, typescript_1.default.sys.readFile);
        const { options } = typescript_1.default.parseJsonConfigFileContent(configFile.config, typescript_1.default.sys, cwd);
        return options;
    }
    return config;
}
const alias = ({ config, cwd }) => {
    cwd = cwd === undefined ? process.cwd() : cwd === '.' ? './' : cwd;
    const compilerOptions = resolveConfig(config, cwd);
    if (!compilerOptions.paths) {
        throw new Error("Unable to find the 'paths' property in the supplied configuration!");
    }
    if (compilerOptions.baseUrl === undefined || compilerOptions.baseUrl === '.') {
        compilerOptions.baseUrl = './';
    }
    compilerOptions.cwd = cwd;
    return new stream_1.Transform({
        objectMode: true,
        transform(file, encoding, callback) {
            /* istanbul ignore if */
            if (file.isStream()) {
                return callback(new Error('Streaming is not supported.'));
            }
            if (file.isNull() || !file.contents) {
                return callback(undefined, file);
            }
            if (!file.path) {
                return callback(new Error('Received file with no path. Files must have path to be resolved.'));
            }
            const lines = file.contents.toString().split('\n');
            const imports = parseImports(lines, file.path);
            if (imports.length === 0) {
                return callback(undefined, file);
            }
            const resolved = resolveImports(lines, imports, compilerOptions);
            file.contents = Buffer.from(resolved.join('\n'));
            callback(undefined, file);
        },
    });
};
exports.default = alias;
// ES5/ES6 fallbacks
module.exports = alias;
module.exports.default = alias;
//# sourceMappingURL=index.js.map