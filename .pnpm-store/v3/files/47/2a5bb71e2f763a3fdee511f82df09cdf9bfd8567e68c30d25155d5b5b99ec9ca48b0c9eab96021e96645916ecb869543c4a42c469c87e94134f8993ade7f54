import { __read } from "tslib";
import { BehaviorSubject } from 'rxjs';
import { useState, useEffect } from 'react';
import useConstant from 'use-constant';
export function useObservable(inputFactory, initialState, inputs) {
    var _a = __read(useState(typeof initialState !== 'undefined' ? initialState : null), 2), state = _a[0], setState = _a[1];
    var state$ = useConstant(function () { return new BehaviorSubject(initialState); });
    var inputs$ = useConstant(function () { return new BehaviorSubject(inputs); });
    useEffect(function () {
        inputs$.next(inputs);
    }, inputs || []);
    useEffect(function () {
        var output$;
        if (inputs) {
            output$ = inputFactory(state$, inputs$);
        }
        else {
            output$ = inputFactory(state$);
        }
        var subscription = output$.subscribe(function (value) {
            state$.next(value);
            setState(value);
        });
        return function () {
            subscription.unsubscribe();
            inputs$.complete();
            state$.complete();
        };
    }, []); // immutable forever
    return state;
}
//# sourceMappingURL=use-observable.js.map