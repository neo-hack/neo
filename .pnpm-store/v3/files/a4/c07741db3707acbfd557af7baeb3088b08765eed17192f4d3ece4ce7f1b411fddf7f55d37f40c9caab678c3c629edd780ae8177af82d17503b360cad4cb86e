export declare type Fetcher<Data> = (...args: any) => Data | Promise<Data>;
export interface Configuration<Data = any, Error = any, Fn extends Fetcher<Data> = Fetcher<Data>> {
    errorRetryInterval: number;
    errorRetryCount?: number;
    loadingTimeout: number;
    focusThrottleInterval: number;
    dedupingInterval: number;
    refreshInterval: number;
    refreshWhenHidden: boolean;
    refreshWhenOffline: boolean;
    revalidateOnFocus: boolean;
    revalidateOnMount?: boolean;
    revalidateOnReconnect: boolean;
    shouldRetryOnError: boolean;
    suspense: boolean;
    fetcher: Fn;
    initialData?: Data;
    isOnline: () => boolean;
    isDocumentVisible: () => boolean;
    isPaused: () => boolean;
    onLoadingSlow: (key: string, config: Readonly<Required<Configuration<Data, Error>>>) => void;
    onSuccess: (data: Data, key: string, config: Readonly<Required<Configuration<Data, Error>>>) => void;
    onError: (err: Error, key: string, config: Readonly<Required<Configuration<Data, Error>>>) => void;
    onErrorRetry: (err: Error, key: string, config: Readonly<Required<Configuration<Data, Error>>>, revalidate: Revalidator, revalidateOpts: Required<RevalidatorOptions>) => void;
    registerOnFocus?: (cb: () => void) => void;
    registerOnReconnect?: (cb: () => void) => void;
    compare: (a: Data | undefined, b: Data | undefined) => boolean;
}
export declare type ValueKey = string | any[] | null;
export declare type Updater<Data = any, Error = any> = (shouldRevalidate?: boolean, data?: Data, error?: Error, shouldDedupe?: boolean, dedupe?: boolean) => boolean | Promise<boolean>;
export declare type Trigger = (key: Key, shouldRevalidate?: boolean) => Promise<any>;
export declare type MutatorCallback<Data = any> = (currentValue: undefined | Data) => Promise<undefined | Data> | undefined | Data;
export declare type Mutator<Data = any> = (key: Key, data?: Data | Promise<Data> | MutatorCallback<Data>, shouldRevalidate?: boolean) => Promise<Data | undefined>;
export declare type Broadcaster<Data = any, Error = any> = (key: string, data: Data, error?: Error, isValidating?: boolean) => void;
export declare type Action<Data, Error> = {
    data?: Data;
    error?: Error;
    isValidating?: boolean;
};
export declare type CacheListener = () => void;
/**
 * @deprecated `ConfigInterface` will be renamed to `SWRConfiguration`.
 */
export declare type ConfigInterface<Data = any, Error = any, Fn extends Fetcher<Data> = Fetcher<Data>> = Partial<Configuration<Data, Error, Fn>>;
export declare type SWRConfiguration<Data = any, Error = any, Fn extends Fetcher<Data> = Fetcher<Data>> = Partial<Configuration<Data, Error, Fn>>;
/**
 * @deprecated `keyInterface` will be renamed to `Key`.
 */
export declare type keyInterface = ValueKey | (() => ValueKey);
export declare type Key = ValueKey | (() => ValueKey);
/**
 * @deprecated `responseInterface` will be renamed to `SWRResponse`.
 */
export declare type responseInterface<Data, Error> = {
    data?: Data;
    error?: Error;
    revalidate: () => Promise<boolean>;
    mutate: (data?: Data | Promise<Data> | MutatorCallback<Data>, shouldRevalidate?: boolean) => Promise<Data | undefined>;
    isValidating: boolean;
};
export interface SWRResponse<Data, Error> {
    data?: Data;
    error?: Error;
    revalidate: () => Promise<boolean>;
    mutate: (data?: Data | Promise<Data> | MutatorCallback<Data>, shouldRevalidate?: boolean) => Promise<Data | undefined>;
    isValidating: boolean;
}
export declare type KeyLoader<Data = any> = (index: number, previousPageData: Data | null) => ValueKey;
/**
 * @deprecated `SWRInfiniteConfigInterface` will be renamed to `SWRInfiniteConfiguration`.
 */
export declare type SWRInfiniteConfigInterface<Data = any, Error = any> = SWRConfiguration<Data[], Error, Fetcher<Data[]>> & {
    initialSize?: number;
    revalidateAll?: boolean;
    persistSize?: boolean;
};
export declare type SWRInfiniteConfiguration<Data = any, Error = any> = SWRConfiguration<Data[], Error, Fetcher<Data[]>> & {
    initialSize?: number;
    revalidateAll?: boolean;
    persistSize?: boolean;
};
/**
 * @deprecated `SWRInfiniteResponseInterface` will be renamed to `SWRInfiniteResponse`.
 */
export declare type SWRInfiniteResponseInterface<Data = any, Error = any> = SWRResponse<Data[], Error> & {
    size: number;
    setSize: (size: number | ((size: number) => number)) => Promise<Data[] | undefined>;
};
export interface SWRInfiniteResponse<Data = any, Error = any> extends SWRResponse<Data[], Error> {
    size: number;
    setSize: (size: number | ((size: number) => number)) => Promise<Data[] | undefined>;
}
/**
 * @deprecated `RevalidateOptionInterface` will be renamed to `RevalidatorOptions`.
 */
export interface RevalidateOptionInterface {
    retryCount?: number;
    dedupe?: boolean;
}
export interface RevalidatorOptions {
    retryCount?: number;
    dedupe?: boolean;
}
/**
 * @deprecated `revalidateType` will be renamed to `Revalidator`.
 */
export declare type revalidateType = (revalidateOpts: RevalidatorOptions) => Promise<boolean>;
export declare type Revalidator = (revalidateOpts: RevalidatorOptions) => Promise<boolean>;
/**
 * @deprecated `CacheInterface` will be renamed to `Cache`.
 */
export interface CacheInterface {
    get(key: Key): any;
    set(key: Key, value: any): any;
    keys(): string[];
    has(key: Key): boolean;
    delete(key: Key): void;
    clear(): void;
    serializeKey(key: Key): [string, any, string, string];
    subscribe(listener: CacheListener): () => void;
}
export interface Cache {
    get(key: Key): any;
    set(key: Key, value: any): any;
    keys(): string[];
    has(key: Key): boolean;
    delete(key: Key): void;
    clear(): void;
    serializeKey(key: Key): [string, any, string, string];
    subscribe(listener: CacheListener): () => void;
}
