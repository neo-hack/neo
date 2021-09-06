/// <reference types="node" />
import { Transform } from 'stream';
import ts from 'typescript';
export declare type CompilerOptions = ts.CompilerOptions;
export interface FileData {
    path: string;
    index: number;
    import: string;
}
export interface PluginOptions {
    config?: ts.CompilerOptions | string;
    cwd?: string;
}
export declare type AliasPlugin = (pluginOptions: PluginOptions) => Transform;
declare const alias: AliasPlugin;
export default alias;
