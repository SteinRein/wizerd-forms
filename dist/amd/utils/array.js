define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.maybeCastArray = function (data) {
        if (!Array.isArray(data)) {
            data = (data) ? [data] : [];
        }
        return data;
    };
    exports.default = {
        maybeCastArray: exports.maybeCastArray,
    };
});
//# sourceMappingURL=array.js.map