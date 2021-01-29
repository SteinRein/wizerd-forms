/**
 * Interfaces
 */
import { WizerdFormOptions } from './interfaces/wizerdFormOptions';
import { wizerdFormCreateElement } from './interfaces/wizerdFormCreateElement';
import WizerdFormControl from './wizerdFormControl';
import WizerdFormPage from './wizerdFormPage';
/**
 * wɪzə(r)d Forms
 * Author: Bastian Fießinger @SteinRein
 * Version: 1.0.0
 */
export default class WizerdForm {
    options: WizerdFormOptions;
    form: HTMLFormElement;
    pages: Array<WizerdFormPage>;
    controlsWrapper: HTMLElement | undefined;
    controls: {
        string: WizerdFormControl;
    };
    static currentKey: number;
    _key: number;
    index: number;
    /**
     * wɪzə(r)d Form Constructor
     *
     * @param {HTMLFormElement} form
     * @param {WizerdFormOptions} options
     */
    constructor(form: HTMLFormElement, options: WizerdFormOptions);
    /**
     * Initialize the current wɪzə(r)d Form Instance.
     * This Method will apply classes to all form elements,
     * move the form to it's startIndex and set all
     * Form controls
     *
     * @return {void}
     */
    init(): void;
    /**
     * Destroy the current wɪzə(r)d Form Instance.
     * This Method will remove form element classes, set the active
     * pageIndex to 0 and remove all Form controls as well as the
     * Form control wrapper if it was added by wɪzə(r)d Forms.
     *
     * @return {void}
     */
    destroy(): void;
    /**
     * Apply classes to all form elements
     * this will ensure that these elements are accessible to pages
     * even if a page is not typeof HTMLFormElement or
     * HTMLFieldsetElement
     *
     * @return {void}
     */
    private applyFormElementClasses;
    /**
     * Remove `wizerdform-element` class added by the
     * `applyFormElementClasses` method. This Method is usually called
     * from `destroy`
     *
     * @return {void}
     */
    private removeFormElementClasses;
    /**
     * Create new instances of `WizerdFormPage` from any
     * Element provided by `options.pages` on init
     *
     * @return {void}
     */
    private setInitialPages;
    /**
     * Get all Elements of the form
     *
     * @return {HTMLFormControlsCollection}
     */
    getElements(): HTMLFormControlsCollection;
    /**
     * Get All form values
     *
     * @return Object
     */
    getValues(): Object;
    /**
     * Get instance of a `WizerdFormPage` by index
     *
     * @param index
     *
     * @return {false|WizerdFormPage} returns false if there is no page with the given index
     */
    getPageByIndex(index: number): false | WizerdFormPage;
    /**
     * Get instance `WizerdFormPage` by the current
     * index
     *
     * @return {WizerdFormPage}
     */
    getCurrentPage(): WizerdFormPage;
    /**
     * Jump directly to another page by it's index.
     * Will return false if pageIndex is less than zero
     *
     * @param {number} pageIndex
     *
     * @return {void|false}
     */
    goToPage(pageIndex?: number): void | false;
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
    navigate(value?: number, noValidate?: boolean | undefined): void | false;
    /**
     * Verify a given pageIndex
     * If index is below zero or bigger than the amount of pages
     * the new index will point to the amount of pages
     *
     * @param index
     */
    private verifyNewPageIndex;
    /**
     *
     * @param index
     */
    private prepareAddPage;
    /**
     * Add a new `WizerdFormPage` by string.
     * This method can be used to create pages from AJAX Calls or other
     * callbacks.
     *
     * @param newPage
     * @param index
     *
     * @return {void|WizerdFormPage}
     */
    addPage(newPage: Function | string, index?: number): void;
    replacePage(index: number, newPage: Function | string): void;
    /**
     * Dynamically create accessible Form controls
     *
     * @param key
     * @param tagName
     * @param props
     * @param inner
     * @param update
     */
    addFormControl(key: string, tagName: string, props?: Object, inner?: null | string | Object, update?: boolean): WizerdFormControl;
    createElement(tagName: string, props?: Object, children?: Array<Object>): wizerdFormCreateElement;
    private setControlsWrapper;
    updateControls(): void;
    private removeControls;
    removeControl(key: string): void;
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
     * submit:
     * fires on form submit
     *
     * @param {string} on
     * @param {CallableFunction} fn
     */
    on(on: string, fn: Function): void;
    private evtHandleInput;
    private evtHandleValidationError;
    private evtHandleNavigation;
    private evtHandleSubmit;
}
