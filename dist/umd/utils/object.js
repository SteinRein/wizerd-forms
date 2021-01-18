(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObjValues = function (obj) {
        return (!Object.values) ?
            Object.keys(obj).map(function (e) { return obj[e]; }) :
            Object.values(obj);
    };
    exports.ObjEntries = function (obj) {
        return (!Object.entries) ?
            Object.keys(obj).map(function (key) { return [key, obj[key]]; }) :
            Object.entries(obj);
    };
});
//# sourceMappingURL=object.js.map