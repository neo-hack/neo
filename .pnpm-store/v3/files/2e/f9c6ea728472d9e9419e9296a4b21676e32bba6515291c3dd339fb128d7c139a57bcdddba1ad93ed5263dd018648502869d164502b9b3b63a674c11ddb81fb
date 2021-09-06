"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventCallback = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var use_constant_1 = tslib_1.__importDefault(require("use-constant"));
var rxjs_1 = require("rxjs");
function useEventCallback(callback, initialState, inputs) {
    var initialValue = (typeof initialState !== 'undefined' ? initialState : null);
    var _a = tslib_1.__read(react_1.useState(initialValue), 2), state = _a[0], setState = _a[1];
    var event$ = use_constant_1.default(function () { return new rxjs_1.Subject(); });
    var state$ = use_constant_1.default(function () { return new rxjs_1.BehaviorSubject(initialValue); });
    var inputs$ = use_constant_1.default(function () { return new rxjs_1.BehaviorSubject(typeof inputs === 'undefined' ? null : inputs); });
    function eventCallback(e) {
        return event$.next(e);
    }
    var returnedCallback = react_1.useCallback(eventCallback, []);
    react_1.useEffect(function () {
        inputs$.next(inputs);
    }, inputs || []);
    react_1.useEffect(function () {
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
exports.useEventCallback = useEventCallback;
//# sourceMappingURL=use-event-callback.js.map