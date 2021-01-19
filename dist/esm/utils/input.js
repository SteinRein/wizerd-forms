export var getInputValues = function (elements) {
    var map = {};
    Array.prototype.forEach.call(elements, function (el) {
        var value = null;
        switch (el.nodeName) {
            case 'INPUT':
                switch (el.type) {
                    case 'checkbox':
                    case 'radio':
                        if (el.checked) {
                            map[el.name] = (el.value === undefined || el.value === '') ? true : el.value;
                        }
                        break;
                    default:
                        map[el.name] = el.value;
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
                        map[el.name] = multiple;
                        break;
                    default:
                        map[el.name] = el.value;
                        break;
                }
                break;
            default:
                break;
        }
    });
    return map;
};
export default {
    getInputValues: getInputValues,
};
//# sourceMappingURL=input.js.map