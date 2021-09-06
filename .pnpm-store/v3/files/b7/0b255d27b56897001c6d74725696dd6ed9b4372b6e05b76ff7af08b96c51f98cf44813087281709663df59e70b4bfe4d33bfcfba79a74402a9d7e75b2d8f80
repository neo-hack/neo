import { Observable, BehaviorSubject } from 'rxjs';
import { RestrictArray, Not } from './type';
export declare type VoidableEventCallback<EventValue> = EventValue extends void ? () => void : (e: EventValue) => void;
export declare type EventCallbackState<EventValue, State, Inputs = void> = [
    VoidableEventCallback<EventValue>,
    [
        State extends void ? null : State,
        BehaviorSubject<State | null>,
        BehaviorSubject<RestrictArray<Inputs> | null>
    ]
];
export declare type ReturnedState<EventValue, State, Inputs> = [
    EventCallbackState<EventValue, State, Inputs>[0],
    EventCallbackState<EventValue, State, Inputs>[1][0]
];
export declare type EventCallback<EventValue, State, Inputs> = Not<Inputs extends void ? true : false, (eventSource$: Observable<EventValue>, state$: Observable<State>, inputs$: Observable<RestrictArray<Inputs>>) => Observable<State>, (eventSource$: Observable<EventValue>, state$: Observable<State>) => Observable<State>>;
export declare function useEventCallback<EventValue>(callback: EventCallback<EventValue, void, void>): ReturnedState<EventValue, void | null, void>;
export declare function useEventCallback<EventValue, State>(callback: EventCallback<EventValue, State, void>, initialState: State): ReturnedState<EventValue, State, void>;
export declare function useEventCallback<EventValue, State, Inputs>(callback: EventCallback<EventValue, State, Inputs>, initialState: State, inputs: RestrictArray<Inputs>): ReturnedState<EventValue, State, Inputs>;
