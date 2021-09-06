import { Cache as CacheType, Key, CacheListener } from './types';
export default class Cache implements CacheType {
    private cache;
    private subs;
    constructor(initialData?: any);
    get(key: Key): any;
    set(key: Key, value: any): any;
    keys(): string[];
    has(key: Key): boolean;
    clear(): void;
    delete(key: Key): void;
    serializeKey(key: Key): [string, any, string, string];
    subscribe(listener: CacheListener): () => void;
    private notify;
}
