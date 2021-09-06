import { Fetcher, Key, Mutator, SWRResponse, Trigger, SWRConfiguration } from './types';
declare const trigger: Trigger;
declare const mutate: Mutator;
declare function useSWR<Data = any, Error = any>(...args: readonly [Key] | readonly [Key, Fetcher<Data> | null] | readonly [Key, SWRConfiguration<Data, Error> | undefined] | readonly [Key, Fetcher<Data> | null, SWRConfiguration<Data, Error> | undefined]): SWRResponse<Data, Error>;
declare const SWRConfig: import("react").ProviderExoticComponent<import("react").ProviderProps<Partial<import("./types").Configuration<any, any, Fetcher<any>>>>> & {
    default: Partial<import("./types").Configuration<any, any, Fetcher<any>>>;
};
export { trigger, mutate, SWRConfig };
export default useSWR;
