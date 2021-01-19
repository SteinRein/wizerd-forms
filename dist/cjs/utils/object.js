"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjEntries = exports.ObjValues = void 0;
var ObjValues = function (obj) {
    return (!Object.values) ?
        Object.keys(obj).map(function (e) { return obj[e]; }) :
        Object.values(obj);
};
exports.ObjValues = ObjValues;
var ObjEntries = function (obj) {
    return (!Object.entries) ?
        Object.keys(obj).map(function (key) { return [key, obj[key]]; }) :
        Object.entries(obj);
};
exports.ObjEntries = ObjEntries;
//# sourceMappingURL=object.js.map