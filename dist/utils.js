"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.values = exports.mapObj = exports.equals = exports.entries = exports.capitalize = void 0;
var capitalize = function (a) {
    return a.charAt(0).toUpperCase() + a.substring(1);
};
exports.capitalize = capitalize;
var entries = function (o) {
    var xs = [];
    for (var _i = 0, _a = Object.keys(o); _i < _a.length; _i++) {
        var key = _a[_i];
        xs.push([key, o[key]]);
    }
    return xs;
};
exports.entries = entries;
var equals = function (a, b) {
    if (a === b)
        return true;
    var typeA = typeof a;
    if (typeA !== typeof b || typeA !== "object")
        return false;
    if (Array.isArray(a)) {
        if (a.length !== b.length)
            return false;
        for (var i = 0; i < a.length; i++)
            if (!(0, exports.equals)(a[i], b[i]))
                return false;
        return true;
    }
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    if (keysA.length !== keysB.length)
        return false;
    for (var i = 0; i < keysA.length; i++) {
        var key = keysA[i];
        if (!(0, exports.equals)(a[key], b[key]))
            return false;
    }
    return true;
};
exports.equals = equals;
var mapObj = function (f, o) {
    var p = {};
    for (var key in o) {
        if (Object.prototype.hasOwnProperty.call(o, key))
            p[key] = f(o[key]);
    }
    return p;
};
exports.mapObj = mapObj;
var values = function (obj) {
    var keys = Object.keys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; i++)
        ret[i] = obj[keys[i]];
    return ret;
};
exports.values = values;
