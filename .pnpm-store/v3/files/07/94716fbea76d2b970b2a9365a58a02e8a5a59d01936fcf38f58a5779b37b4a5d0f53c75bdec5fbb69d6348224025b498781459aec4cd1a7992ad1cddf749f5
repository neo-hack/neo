import { Observable } from 'rxjs';
import { RestrictArray } from './type';
export declare type InputFactory<State> = (state$: Observable<State>) => Observable<State>;
export declare type InputFactoryWithInputs<State, Inputs> = (state$: Observable<State>, inputs$: Observable<RestrictArray<Inputs>>) => Observable<State>;
export declare function useObservable<State>(inputFactory: InputFactory<State>): State | null;
export declare function useObservable<State>(inputFactory: InputFactory<State>, initialState: State): State;
export declare function useObservable<State, Inputs>(inputFactory: InputFactoryWithInputs<State, Inputs>, initialState: State, inputs: RestrictArray<Inputs>): State;
