"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useObservable = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var react_1 = require("react");
var use_constant_1 = tslib_1.__importDefault(require("use-constant"));
function useObservable(inputFactory, initialState, inputs) {
    var _a = tslib_1.__read(react_1.useState(typeof initialState !== 'undefined' ? initialState : null), 2), state = _a[0], setState = _a[1];
    var state$ = use_constant_1.default(function () { return new rxjs_1.BehaviorSubject(initialState); });
    var inputs$ = use_constant_1.default(function () { return new rxjs_1.BehaviorSubject(inputs); });
    react_1.useEffect(function () {
        inputs$.next(inputs);
    }, inputs || []);
    react_1.useEffect(function () {
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
exports.useObservable = useObservable;
//# sourceMappingURL=use-observable.js.map