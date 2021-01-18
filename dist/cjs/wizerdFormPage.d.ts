export default class {
    page: HTMLElement;
    index: number;
    options: any;
    constructor(page: HTMLElement, index: number, options?: {});
    applyPageAttributes(): void;
    removePageAttributes(): void;
    show(): void;
    hide(): void;
    /**
     * get current Page Elements
     *
     * @return {HTMLCollection}
     */
    getElements(): HTMLCollection;
    /**
     * Get Values of current Page
     *
     * @return Object
     */
    getValues(): Object;
    /**
     * Primitive Validation
     *
     * For browsers above IE9 use the HTMLInputElement's API checkValidity function
     * prior use a custom validation that is similar to the browsers default.
     *
     * @return {boolean} validation status
     */
    validate(): {
        valid: boolean;
        field: HTMLElement;
    };
}
