"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeCastArray = void 0;
var maybeCastArray = function (data) {
    if (!Array.isArray(data)) {
        data = (data) ? [data] : [];
    }
    return data;
};
exports.maybeCastArray = maybeCastArray;
exports.default = {
    maybeCastArray: exports.maybeCastArray,
};
//# sourceMappingURL=array.js.map