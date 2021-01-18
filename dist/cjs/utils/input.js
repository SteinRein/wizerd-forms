"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputValues = function (elements) {
    var map = {};
    Array.prototype.forEach.call(elements, function (el) {
        var value = null;
        switch (el.nodeName) {
            case 'INPUT':
                switch (el.type) {
                    case 'checkbox':
                    case 'radio':
                        if (el.checked) {
                            value = true;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case 'SELECT':
                switch (el.type) {
                    case 'select-multiple':
                        var multiple = [];
                        for (var i = 0; i < el.options.length; i++) {
                            if (el.options[i].selected) {
                                multiple.push(el.options[i].value);
                            }
                        }
                        value = multiple;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        map[el.name] = (value === null) ? el.value : value;
    });
    return map;
};
exports.default = {
    getInputValues: exports.getInputValues,
};
//# sourceMappingURL=input.js.map