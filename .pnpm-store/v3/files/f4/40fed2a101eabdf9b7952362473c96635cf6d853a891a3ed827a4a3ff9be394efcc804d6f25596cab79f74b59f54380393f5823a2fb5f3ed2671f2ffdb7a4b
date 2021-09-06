import { __read } from "tslib";
import { useEffect, useState, useCallback } from 'react';
import useConstant from 'use-constant';
import { BehaviorSubject, Subject } from 'rxjs';
export function useEventCallback(callback, initialState, inputs) {
    var initialValue = (typeof initialState !== 'undefined' ? initialState : null);
    var _a = __read(useState(initialValue), 2), state = _a[0], setState = _a[1];
    var event$ = useConstant(function () { return new Subject(); });
    var state$ = useConstant(function () { return new BehaviorSubject(initialValue); });
    var inputs$ = useConstant(function () { return new BehaviorSubject(typeof inputs === 'undefined' ? null : inputs); });
    function eventCallback(e) {
        return event$.next(e);
    }
    var returnedCallback = useCallback(eventCallback, []);
    useEffect(function () {
        inputs$.next(inputs);
    }, inputs || []);
    useEffect(function () {
        setState(initialValue);
        var value$;
        if (!inputs) {
            value$ = callback(event$, state$);
        }
        else {
            value$ = callback(event$, state$, inputs$);
        }
        var subscription = value$.subscribe(function (value) {
            state$.next(value);
            setState(value);
        });
        return function () {
            subscription.unsubscribe();
            state$.complete();
            inputs$.complete();
            event$.complete();
        };
    }, []); // immutable forever
    return [returnedCallback, state];
}
//# sourceMappingURL=use-event-callback.js.map