"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Form input validation
 *
 * For browsers above IE9 use the HTMLInputElement's API checkValidity function
 * prior use a custom validation that is similar to the browsers default.
 *
 * @param field - the input to check
 *
 * @return {boolean} validation status
 */
function validateInput(field) {
    if ('checkValidity' in HTMLInputElement.prototype) {
        if (!field.checkValidity()) {
            return false;
        }
    }
    else {
        // Validate required attribute
        if (field.hasAttribute('required') && (!field.value || field.value.trim() === '')) {
            return false;
        }
        // Validate minlength attribute
        if (field.hasAttribute('minlength') && parseFloat(field.getAttribute('minlength')) < field.value.length) {
            return false;
        }
        // Validate maxlength attribute
        if (field.hasAttribute('maxlength') && parseFloat(field.getAttribute('maxlength')) > field.value.length) {
            return false;
        }
        // Validate Pattern
        if (field.hasAttribute('pattern') && !new RegExp(field.getAttribute('pattern'), 'i').test(String(field.value))) {
            return false;
        }
        // Validation for inputs by type
        switch (field.type) {
            case 'number':
                // Validate min attribute for numeric input
                if (field.hasAttribute('min') && parseFloat(field.getAttribute('min')) < parseFloat(field.value)) {
                    return false;
                }
                // Validate max attribute for numeric input
                if (field.hasAttribute('max') && parseFloat(field.getAttribute('max')) > parseFloat(field.value)) {
                    return false;
                }
                break;
            case 'date':
                // Validate min attribute for date input
                if (field.hasAttribute('min') && new Date(field.getAttribute('min')) < new Date(field.value)) {
                    return false;
                }
                // Validate max attribute for date input
                if (field.hasAttribute('max') && new Date(field.getAttribute('max')) > new Date(field.value)) {
                    return false;
                }
            case 'week':
            case 'time':
                // Validate min attribute for date input
                if (field.hasAttribute('min') && field.getAttribute('min') < field.value) {
                    return false;
                }
                // Validate max attribute for date input
                if (field.hasAttribute('max') && field.getAttribute('max') > field.value) {
                    return false;
                }
            case 'email':
                // Validate E-Mail
                var emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i');
                if (!emailPattern.test(String(field.value))) {
                    return false;
                }
            case 'url':
                // Validate URL
                var urlPattern = new RegExp(/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/, 'i');
                if (field.type === 'url' && !urlPattern.test(String(field.value))) {
                    return false;
                }
            default:
                break;
        }
    }
    return true;
}
exports.validateInput = validateInput;
//# sourceMappingURL=validation.js.map