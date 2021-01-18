var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils/DOMUtils", "./utils/object", "./utils/input", "./wizerdFormControl", "./wizerdFormPage", "@s-libs/micro-dash"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Internal Dependencies
     */
    var DOMUtils_1 = require("./utils/DOMUtils");
    var object_1 = require("./utils/object");
    var input_1 = require("./utils/input");
    var wizerdFormControl_1 = require("./wizerdFormControl");
    var wizerdFormPage_1 = require("./wizerdFormPage");
    /**
     * External Dependencies
     */
    var micro_dash_1 = require("@s-libs/micro-dash");
    /**
     * wɪzə(r)d Forms
     * Author: Bastian Fießinger @SteinRein
     * Version: 1.0.0
     */
    var WizerdForm = /** @class */ (function () {
        /**
         * wɪzə(r)d Form Constructor
         *
         * @param {HTMLFormElement} form
         * @param {WizerdFormOptions} options
         */
        function WizerdForm(form, options) {
            this._key = ++WizerdForm.currentKey;
            // Setup wɪzə(r)d Form options
            var defaults = {
                startIndex: 0,
                pages: '.wizerdform-page',
                // Controls
                controlsPosition: 'bottom',
                controlsWrapper: true,
                // Classes
                hiddenPageClass: 'wizerdform-hidden-page',
                activePageClass: 'wizerdform-active-page',
            };
            options = options || defaults;
            for (var opt in defaults) {
                if (defaults.hasOwnProperty(opt) && !options.hasOwnProperty(opt)) {
                    options[opt] = defaults[opt];
                }
            }
            this.options = options;
            this.form = form;
            this.controlsWrapper = undefined;
            this.controls = {};
            this.pages = [];
            // Page Parameters
            this.index = this.options.startIndex;
        }
        /**
         * Initialize the current wɪzə(r)d Form Instance.
         * This Method will apply classes to all form elements,
         * move the form to it's startIndex and set all
         * Form controls
         *
         * @return {void}
         */
        WizerdForm.prototype.init = function () {
            this.setInitialPages();
            this.applyFormElementClasses();
            this.goToPage(this.index);
            this.setControlsWrapper();
            this.updateControls();
        };
        /**
         * Destroy the current wɪzə(r)d Form Instance.
         * This Method will remove form element classes, set the active
         * pageIndex to 0 and remove all Form controls as well as the
         * Form control wrapper if it was added by wɪzə(r)d Forms.
         *
         * @return {void}
         */
        WizerdForm.prototype.destroy = function () {
            this.pages.forEach(function (page) {
                page.removePageAttributes();
            });
            this.pages = [];
            this.removeFormElementClasses();
            this.goToPage(0);
            this.removeControls();
        };
        /**
         * Apply classes to all form elements
         * this will ensure that these elements are accessible to pages
         * even if a page is not typeof HTMLFormElement or
         * HTMLFieldsetElement
         *
         * @return {void}
         */
        WizerdForm.prototype.applyFormElementClasses = function () {
            Array.prototype.forEach.call(this.form.elements, function (element) {
                element.classList.add('wizerdform-element');
            });
        };
        /**
         * Remove `wizerdform-element` class added by the
         * `applyFormElementClasses` method. This Method is usually called
         * from `destroy`
         *
         * @return {void}
         */
        WizerdForm.prototype.removeFormElementClasses = function () {
            Array.prototype.forEach.call(this.form.elements, function (element) {
                element.classList.remove('wizerdform-element');
            });
        };
        /**
         * Create new instances of `WizerdFormPage` from any
         * Element provided by `options.pages` on init
         *
         * @return {void}
         */
        WizerdForm.prototype.setInitialPages = function () {
            var _this = this;
            var pages = (NodeList.prototype.isPrototypeOf(this.options.pages) || HTMLCollection.prototype.isPrototypeOf(this.options.pages)) ?
                Array.prototype.slice.call(this.options.pages) :
                Array.prototype.slice.call(this.form.querySelectorAll(this.options.pages));
            pages.forEach(function (page, index) {
                var p = new wizerdFormPage_1.default(page, index, _this.options);
                _this.pages.push(p);
            });
        };
        /**
         * Get all Elements of the form
         *
         * @return {HTMLFormControlsCollection}
         */
        WizerdForm.prototype.getElements = function () {
            return this.form.getElementsByClassName('wizerdform-element');
        };
        /**
         * Get All form values
         *
         * @return Object
         */
        WizerdForm.prototype.getValues = function () {
            var elements = Array.prototype.filter.call(this.getElements(), function (el) {
                if (el.name !== '') {
                    return el;
                }
            });
            return input_1.getInputValues(elements);
        };
        /**
         * Get instance of a `WizerdFormPage` by index
         *
         * @param index
         *
         * @return {false|WizerdFormPage} returns false if there is no page with the given index
         */
        WizerdForm.prototype.getPageByIndex = function (index) {
            var filtered = false;
            this.pages.forEach(function (page) {
                // Stop loop execution if index was filtered
                if (filtered !== false) {
                    return;
                }
                if (page.index === index) {
                    filtered = page;
                }
            });
            return filtered;
        };
        /**
         * Get instance `WizerdFormPage` by the current
         * index
         *
         * @return {WizerdFormPage}
         */
        WizerdForm.prototype.getCurrentPage = function () {
            return this.getPageByIndex(this.index);
        };
        /**
         * Jump directly to another page by it's index.
         * Will return false if pageIndex is less than zero
         *
         * @param {number} pageIndex
         *
         * @return {void|false}
         */
        WizerdForm.prototype.goToPage = function (pageIndex) {
            if (pageIndex === void 0) { pageIndex = 0; }
            if (pageIndex < 0) {
                return false;
            }
            Array.prototype.forEach.call(this.pages, function (page) {
                page.hide();
            });
            this.pages[pageIndex].show();
        };
        /**
         * Navigate the form by a given value of pages.
         * Using a negative number in the first parameter will result in
         * navigating to previous pages
         *
         * @param {number} value amount of pages to move. Use negative numbers to move to previous pages.
         * @param {boolean|undefined} noValidate
         *
         * @return {void|false} returns false on the last page
         */
        WizerdForm.prototype.navigate = function (value, noValidate) {
            if (value === void 0) { value = 0; }
            if (noValidate === void 0) { noValidate = false; }
            if ((value === 1 && (!noValidate && !this.getCurrentPage().validate().valid)) ||
                (value === -1 && this.index === 0)) {
                return false;
            }
            this.pages[this.index].hide();
            var eventNavigate = new Event('wizerdForm_navigate', {
                cancelable: true
            });
            this.form.dispatchEvent(eventNavigate);
            if (this.index === this.pages.length - 1 && value > 0) {
                var eventSubmit = new Event('submit');
                this.form.dispatchEvent(eventSubmit);
            }
            else {
                this.index += value;
            }
            this.goToPage(this.index);
            this.updateControls();
        };
        /**
         * Add a new `WizerdFromPage` by string.
         * This method can be used to create pages from AJAX Calls or other
         * callbacks.
         *
         * @param newPage
         * @param index
         *
         * @return {void|WizerdFormPage}
         */
        WizerdForm.prototype.addPage = function (newPage, index) {
            if (index === void 0) { index = -1; }
            if (typeof newPage === 'function') {
                newPage = newPage();
            }
            if (!micro_dash_1.isString(newPage) || newPage === '') {
                return;
            }
            var tempPage = document.createElement('fieldset');
            tempPage.innerHTML = newPage;
            var pageNode;
            if (tempPage.children.length > 1) {
                pageNode = tempPage;
            }
            else {
                pageNode = tempPage.children[0];
            }
            if (index < 0 || index > this.pages.length) {
                index = this.pages.length;
            }
            var reference = this.pages[index];
            if (typeof reference !== 'undefined') {
                this.form.insertBefore(pageNode, reference.page);
            }
            else {
                this.form.insertBefore(pageNode, this.pages[index - 1].page.nextSibling);
            }
            var page = new wizerdFormPage_1.default(pageNode, index, this.options);
            this.pages.push(page);
            this.applyFormElementClasses();
            this.goToPage(this.index);
            return page;
        };
        /**
         * Dynamically create accessible Form controls
         *
         * @param key
         * @param tagName
         * @param props
         * @param inner
         * @param update
         */
        WizerdForm.prototype.addFormControl = function (key, tagName, props, inner, update) {
            if (props === void 0) { props = {}; }
            if (inner === void 0) { inner = null; }
            if (update === void 0) { update = true; }
            var ctr = new wizerdFormControl_1.default(key, tagName, props, inner);
            this.controls[key] = ctr;
            if (!!update) {
                this.updateControls();
            }
            return ctr;
        };
        WizerdForm.prototype.createElement = function (tagName, props, children) {
            if (props === void 0) { props = {}; }
            if (children === void 0) { children = []; }
            return DOMUtils_1.createElement(tagName, props, children);
        };
        WizerdForm.prototype.setControlsWrapper = function () {
            var controlsWrapper;
            // Insert new ControlsWrapper if not already given
            if (!this.controlsWrapper) {
                if (this.options.controlsWrapper !== false && typeof this.options.controlsWrapper === 'object') {
                    controlsWrapper = this.options.controlsWrapper;
                }
                else if (this.options.controlsWrapper !== false) {
                    var wrapperEl = document.createElement('div');
                    wrapperEl.className = 'wizerdform-controls';
                    controlsWrapper = wrapperEl;
                    if (this.options.controlsPosition === 'bottom') {
                        this.form.appendChild(wrapperEl);
                    }
                    else {
                        this.form.insertBefore(wrapperEl, this.form.firstChild);
                    }
                }
                else {
                    controlsWrapper = this.form;
                }
            }
            this.controlsWrapper = controlsWrapper;
            return controlsWrapper;
        };
        WizerdForm.prototype.updateControls = function () {
            if (this.controlsWrapper !== undefined && typeof this.controlsWrapper === 'object') {
                var controls = DOMUtils_1.createElement('fragment', {}, __spreadArrays(Array.from(object_1.ObjValues(this.controls), function (ctr) { return ctr.data; })));
                var $controls_1 = DOMUtils_1.renderNode(controls);
                object_1.ObjValues(this.controls).forEach(function (ctr, i) {
                    var ctrElement = $controls_1.childNodes[i];
                    ctr.element = ctrElement;
                });
                DOMUtils_1.mountChildElements($controls_1, this.controlsWrapper);
            }
        };
        WizerdForm.prototype.removeControls = function () {
            var _this = this;
            var _a;
            object_1.ObjValues(this.controls).forEach(function (ctr) {
                _this.removeControl(ctr.key);
            });
            if (this.controlsWrapper !== undefined && this.controlsWrapper.className === 'wizerdform-controls') {
                (_a = this.controlsWrapper.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.controlsWrapper);
            }
        };
        WizerdForm.prototype.removeControl = function (key) {
            if (this.controls.hasOwnProperty(key)) {
                delete this.controls[key];
                this.updateControls();
            }
        };
        /**
         * Custom Event Handlers
         *
         * available callbacks:
         *
         * input:
         * change:
         * fires whenever an input changes
         *
         * error:
         * fires when validation fails
         *
         * navigate:
         * fires on navigation
         *
         * @param {string} on
         * @param {CallableFunction} fn
         */
        WizerdForm.prototype.on = function (on, fn) {
            switch (on) {
                case 'input':
                case 'change':
                    this.evtHandleInput(fn);
                    break;
                case 'error':
                    this.evtHandleValidationError(fn);
                    break;
                case 'navigate':
                    this.evtHandleNavigation(fn);
                    break;
                case 'submit':
                    this.evtHandleSubmit(fn);
                    break;
            }
            return;
        };
        WizerdForm.prototype.evtHandleInput = function (fn) {
            var _this = this;
            Array.prototype.forEach.call(this.getCurrentPage().getElements(), function (el) {
                el.addEventListener('keyup', function (evt) {
                    // Prevent Bubbling
                    if (evt.target !== el) {
                        return;
                    }
                    var curVal = el.value;
                    fn.bind(el, evt, {
                        wizerdForm: _this,
                        el: el,
                        value: curVal,
                    })();
                });
            });
        };
        WizerdForm.prototype.evtHandleValidationError = function (fn) {
            var _this = this;
            Array.prototype.forEach.call(this.getCurrentPage().getElements(), function (formField) {
                formField.addEventListener('wizerdForm_validationFailed', function (evt) {
                    fn.bind(formField, evt, {
                        wizerdForm: _this,
                        el: formField,
                    })();
                });
            });
        };
        WizerdForm.prototype.evtHandleNavigation = function (fn) {
            var _this = this;
            this.form.addEventListener('wizerdForm_navigate', function (evt) {
                var curIndex = _this.index;
                fn.bind(_this, evt, {
                    wizerdForm: _this,
                    index: curIndex,
                })();
            });
        };
        WizerdForm.prototype.evtHandleSubmit = function (fn) {
            var _this = this;
            this.form.addEventListener('submit', function (evt) {
                fn.bind(_this, evt, {
                    wizerdForm: _this
                })();
            });
        };
        WizerdForm.currentKey = 0;
        return WizerdForm;
    }());
    exports.default = WizerdForm;
});
//# sourceMappingURL=wizerdForm.js.map