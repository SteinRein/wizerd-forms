"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal Dependencies
 */
var validation_1 = require("./utils/validation");
var default_1 = /** @class */ (function () {
    function default_1(page, index, options) {
        if (options === void 0) { options = {}; }
        this.page = page;
        this.index = index;
        this.options = options || {};
        this.applyPageAttributes();
    }
    default_1.prototype.applyPageAttributes = function () {
        this.page.setAttribute('data-wizerdform-page', '');
    };
    default_1.prototype.removePageAttributes = function () {
        this.page.removeAttribute('data-wizerdform-page');
    };
    default_1.prototype.show = function () {
        this.page.classList.remove(this.options.hiddenPageClass);
        this.page.classList.add(this.options.activePageClass);
    };
    default_1.prototype.hide = function () {
        this.page.classList.remove(this.options.activePageClass);
        this.page.classList.add(this.options.hiddenPageClass);
    };
    /**
     * get current Page Elements
     *
     * @return {HTMLCollection}
     */
    default_1.prototype.getElements = function () {
        return this.page.getElementsByClassName('wizerdform-element');
    };
    /**
     * Get Values of current Page
     *
     * @return Object
     */
    default_1.prototype.getValues = function () {
        var elements = Array.prototype.filter.call(this.getElements(), function (el) {
            if (el.name !== '') {
                return el;
            }
        });
        var map = {};
        elements.forEach(function (el) {
            map[el.name] = el.value;
        });
        return map;
    };
    /**
     * Primitive Validation
     *
     * For browsers above IE9 use the HTMLInputElement's API checkValidity function
     * prior use a custom validation that is similar to the browsers default.
     *
     * @return {boolean} validation status
     */
    default_1.prototype.validate = function () {
        var valid = true;
        var fieldValidated;
        var eventValidationFailed = new Event('wizerdForm_validationFailed');
        var elements = this.getElements();
        Array.prototype.forEach.call(elements, function (field) {
            fieldValidated = field;
            valid = validation_1.validateInput(field);
        });
        if (valid !== true && fieldValidated) {
            fieldValidated.classList.add('has-error');
            fieldValidated.dispatchEvent(eventValidationFailed);
        }
        return {
            valid: valid,
            field: fieldValidated
        };
    };
    return default_1;
}());
exports.default = default_1;
//# sourceMappingURL=wizerdFormPage.js.map