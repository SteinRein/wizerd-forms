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
    exports.WizerdFormElement = void 0;
    var WizerdFormElement = /** @class */ (function () {
        function WizerdFormElement() {
        }
        return WizerdFormElement;
    }());
    exports.WizerdFormElement = WizerdFormElement;
    exports.default = WizerdFormElement;
});
//# sourceMappingURL=wizerdFormElement.js.map