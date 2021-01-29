(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./wizerdForm"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require('./utils/polyfills');
    var wizerdForm_1 = require("./wizerdForm");
    exports.default = wizerdForm_1.default;
});
//# sourceMappingURL=index.js.map