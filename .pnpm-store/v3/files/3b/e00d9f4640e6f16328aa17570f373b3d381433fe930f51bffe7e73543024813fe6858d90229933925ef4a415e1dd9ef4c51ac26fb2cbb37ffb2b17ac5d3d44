import hash from './libs/hash';
var Cache = /** @class */ (function () {
    function Cache(initialData) {
        if (initialData === void 0) { initialData = {}; }
        this.cache = new Map(Object.entries(initialData));
        this.subs = [];
    }
    Cache.prototype.get = function (key) {
        var _key = this.serializeKey(key)[0];
        return this.cache.get(_key);
    };
    Cache.prototype.set = function (key, value) {
        var _key = this.serializeKey(key)[0];
        this.cache.set(_key, value);
        this.notify();
    };
    Cache.prototype.keys = function () {
        return Array.from(this.cache.keys());
    };
    Cache.prototype.has = function (key) {
        var _key = this.serializeKey(key)[0];
        return this.cache.has(_key);
    };
    Cache.prototype.clear = function () {
        this.cache.clear();
        this.notify();
    };
    Cache.prototype.delete = function (key) {
        var _key = this.serializeKey(key)[0];
        this.cache.delete(_key);
        this.notify();
    };
    // TODO: introduce namespace for the cache
    Cache.prototype.serializeKey = function (key) {
        var args = null;
        if (typeof key === 'function') {
            try {
                key = key();
            }
            catch (err) {
                // dependencies not ready
                key = '';
            }
        }
        if (Array.isArray(key)) {
            // args array
            args = key;
            key = hash(key);
        }
        else {
            // convert null to ''
            key = String(key || '');
        }
        var errorKey = key ? 'err@' + key : '';
        var isValidatingKey = key ? 'validating@' + key : '';
        return [key, args, errorKey, isValidatingKey];
    };
    Cache.prototype.subscribe = function (listener) {
        var _this = this;
        if (typeof listener !== 'function') {
            throw new Error('Expected the listener to be a function.');
        }
        var isSubscribed = true;
        this.subs.push(listener);
        return function () {
            if (!isSubscribed)
                return;
            isSubscribed = false;
            var index = _this.subs.indexOf(listener);
            if (index > -1) {
                _this.subs[index] = _this.subs[_this.subs.length - 1];
                _this.subs.length--;
            }
        };
    };
    // Notify Cache subscribers about a change in the cache
    Cache.prototype.notify = function () {
        for (var _i = 0, _a = this.subs; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener();
        }
    };
    return Cache;
}());
export default Cache;
