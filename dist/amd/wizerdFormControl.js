define(["require", "exports", "./utils/DOMUtils", "./utils/array"], function (require, exports, DOMUtils_1, array_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_1 = /** @class */ (function () {
        function default_1(key, tagName, props, children) {
            children = array_1.maybeCastArray(children);
            this.key = key;
            this.data = DOMUtils_1.createElement(tagName, props || {}, children || []);
            this.element = undefined;
        }
        /**
         * Wrapper function around addEventlistener
         *
         * @param type
         * @param listener
         * @param options
         */
        default_1.prototype.addEventListener = function (type, listener, options) {
            var _this = this;
            if (options === void 0) { options = false; }
            document.addEventListener(type, function (evt) {
                var target = evt.target;
                var element = _this.element;
                if (element === undefined || target === null || !element.contains(target)) {
                    return;
                }
                listener(evt);
            }, options);
        };
        return default_1;
    }());
    exports.default = default_1;
});
//# sourceMappingURL=wizerdFormControl.js.map