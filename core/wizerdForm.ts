/**
 * Interfaces
 */
import { WizerdFormOptions } from './interfaces/wizerdFormOptions';
import { wizerdFormCreateElement } from './interfaces/wizerdFormCreateElement';

/**
 * Internal Dependencies
 */
import { createElement, renderNode, mountChildElements } from './utils/DOMUtils';
import { ObjValues } from './utils/object';
import { getInputValues } from './utils/input';
import WizerdFormControl from './wizerdFormControl';
import WizerdFormPage from './wizerdFormPage';

/**
 * External Dependencies
 */
import { isString } from '@s-libs/micro-dash';

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
	controls: {string: WizerdFormControl};

  static currentKey = 0;
	_key = ++WizerdForm.currentKey;

	index: number;

	/**
	 * wɪzə(r)d Form Constructor
	 *
	 * @param {HTMLFormElement} form
	 * @param {WizerdFormOptions} options
	 */
	constructor(form: HTMLFormElement, options: WizerdFormOptions) {

		// Setup wɪzə(r)d Form options
    const defaults: WizerdFormOptions = {
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
			if (defaults.hasOwnProperty(opt) && ! options.hasOwnProperty(opt)) {
				options[opt] = defaults[opt];
			}
		}

		this.options = options;

		this.form = form;
		this.controlsWrapper = undefined;
		this.controls = {} as {string: WizerdFormControl};

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
	init(): void {
		this.setInitialPages();
		this.applyFormElementClasses();
		this.goToPage(this.index);
		this.setControlsWrapper();
		this.updateControls();
	}

	/**
	 * Destroy the current wɪzə(r)d Form Instance.
	 * This Method will remove form element classes, set the active
	 * pageIndex to 0 and remove all Form controls as well as the
	 * Form control wrapper if it was added by wɪzə(r)d Forms.
	 *
	 * @return {void}
	 */
	destroy(): void {
		this.pages.forEach((page) => {
			page.removePageAttributes();
		});
		this.pages = [];
		this.removeFormElementClasses();
		this.goToPage(0);
		this.removeControls();
	}

	/**
	 * Apply classes to all form elements
	 * this will ensure that these elements are accessible to pages
	 * even if a page is not typeof HTMLFormElement or
	 * HTMLFieldsetElement
	 *
	 * @return {void}
	 */
	private applyFormElementClasses(): void {
		Array.prototype.forEach.call(this.form.elements, (element) => {
			element.classList.add('wizerdform-element');
		});
	}

	/**
	 * Remove `wizerdform-element` class added by the
	 * `applyFormElementClasses` method. This Method is usually called
	 * from `destroy`
	 *
	 * @return {void}
	 */
	private removeFormElementClasses(): void {
		Array.prototype.forEach.call(this.form.elements, (element) => {
			element.classList.remove('wizerdform-element');
		});
	}

	/**
	 * Create new instances of `WizerdFormPage` from any
	 * Element provided by `options.pages` on init
	 *
	 * @return {void}
	 */
	private setInitialPages(): void {
		const pages = ( NodeList.prototype.isPrototypeOf(this.options.pages) || HTMLCollection.prototype.isPrototypeOf(this.options.pages) ) ?
										Array.prototype.slice.call(this.options.pages as unknown as NodeList | HTMLCollection) :
										Array.prototype.slice.call(this.form.querySelectorAll(this.options.pages));

		pages.forEach((page, index) => {
			const p = new WizerdFormPage(page, index, this.options);
			this.pages.push(p);
		});
	}

	/**
	 * Get all Elements of the form
	 *
	 * @return {HTMLFormControlsCollection}
	 */
	getElements(): HTMLFormControlsCollection {
		return this.form.getElementsByClassName('wizerdform-element');
	}

	/**
	 * Get All form values
	 *
	 * @return Object
	 */
	getValues(): Object {
		const elements: HTMLFormControlsCollection = Array.prototype.filter.call(this.getElements(), (el) => {
      if ( el.name !== '' ) {
        return el;
      }
		});
		return getInputValues(elements);
	}

	/**
	 * Get instance of a `WizerdFormPage` by index
	 *
	 * @param index
	 *
	 * @return {false|WizerdFormPage} returns false if there is no page with the given index
	 */
	getPageByIndex(index: number): false | WizerdFormPage {
		let filtered: false | WizerdFormPage = false;
		this.pages.forEach((page) => {
			// Stop loop execution if index was filtered
			if (filtered !== false) {
				return;
			}

			if (page.index === index) {
				filtered = page;
			}
		});
		return filtered;
	}

	/**
	 * Get instance `WizerdFormPage` by the current
	 * index
	 *
	 * @return {WizerdFormPage}
	 */
	getCurrentPage(): WizerdFormPage {
		return this.getPageByIndex(this.index) as WizerdFormPage;
	}

	/**
	 * Jump directly to another page by it's index.
	 * Will return false if pageIndex is less than zero
	 *
	 * @param {number} pageIndex
	 *
	 * @return {void|false}
	 */
	goToPage(pageIndex = 0): void | false {
		if ( pageIndex < 0 ) {
			return false;
		}

		Array.prototype.forEach.call( this.pages, ( page ) => {
			page.hide();
		} );

		this.pages[pageIndex].show();
	}

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
	navigate(value: number = 0, noValidate: boolean | undefined = false): void | false {
		if (
			(value === 1 && (!noValidate && !this.getCurrentPage().validate().valid)) ||
			(value === -1 && this.index === 0)
		) {
			return false;
		}

		this.pages[this.index].hide();

		const eventNavigate = new Event(
			'wizerdForm_navigate',
			{
				cancelable: true
			}
		);
		this.form.dispatchEvent(eventNavigate);

		if (this.index === this.pages.length - 1 && value > 0) {
			const eventSubmit = new Event(
				'submit'
			);
			this.form.dispatchEvent(eventSubmit);
		} else {
			this.index += value;
		}

		this.goToPage(this.index);
		this.updateControls();
	}

	/**
	 * Verify a given pageIndex
	 * If index is below zero or bigger than the amount of pages
	 * the new index will point to the amount of pages
	 *
	 * @param index
	 */
	private verifyNewPageIndex(index: number): number {
		if ( index < 0 || index > this.pages.length ) {
			index = this.pages.length;
		}
		return index;
	}

	/**
	 *
	 * @param index
	 */
	private prepareAddPage(index: number = -1) {
		const tempPage = document.createElement('fieldset');

		index = this.verifyNewPageIndex(index);

		const page = new WizerdFormPage(tempPage, index, this.options);
		this.pages.splice(index, 0, page);
		for (let i = index + 1; i < this.pages.length; i++) {
			this.pages[i].index = i;
		}

		return tempPage;
	}

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
	addPage(newPage: Function | string, index: number = -1): void {
		if ( typeof newPage === 'function' ) {
			newPage = newPage();
		}

		if ( !isString(newPage) || newPage === '' ) {
			return;
		}

		const tempPage = this.prepareAddPage(index);
		let reference = this.pages[index + 1];
		if ( typeof reference !== 'undefined' ) {
			this.form.insertBefore( tempPage, reference.page );
		} else {
			this.form.insertBefore( tempPage, this.pages[index - 1].page.nextSibling);
		}

		this.replacePage(index, newPage);

		this.applyFormElementClasses();
		this.goToPage(this.index);
	}

	replacePage(index: number, newPage: Function | string): void {
		if ( index === undefined || newPage === undefined ) {
			return;
		}

		if ( typeof newPage === 'function' ) {
			newPage = newPage();
		}

		if ( !isString(newPage) || newPage === '' ) {
			return;
		}

		index = Math.min(this.verifyNewPageIndex(index), this.pages.length - 1);
		const toReplace = this.pages[index].page;
		toReplace.innerHTML = newPage;
	}

	/**
	 * Dynamically create accessible Form controls
	 *
	 * @param key
	 * @param tagName
	 * @param props
	 * @param inner
	 * @param update
	 */
	addFormControl(key: string, tagName: string, props: Object = {}, inner: null | string | Object = null, update: boolean = true): WizerdFormControl {
		const ctr: WizerdFormControl = new WizerdFormControl(key, tagName, props, inner);
		this.controls[key] = ctr;
		if ( !! update ) {
			this.updateControls();
		}
		return ctr;
	}

	createElement(tagName: string, props: Object = {}, children: Array<Object> = []): wizerdFormCreateElement {
		return createElement(tagName, props, children);
	}

	private setControlsWrapper(): HTMLElement {
		let controlsWrapper;
		// Insert new ControlsWrapper if not already given
		if ( ! this.controlsWrapper ) {
			if ( this.options.controlsWrapper !== false && typeof this.options.controlsWrapper === 'object' ) {
				controlsWrapper = this.options.controlsWrapper;
			} else if ( this.options.controlsWrapper !== false ) {
				let wrapperEl = document.createElement('div');
				wrapperEl.className = 'wizerdform-controls';
				controlsWrapper = wrapperEl;
				if ( this.options.controlsPosition === 'bottom' ) {
					this.form.appendChild(wrapperEl);
				} else {
					this.form.insertBefore(wrapperEl, this.form.firstChild);
				}
			} else {
				controlsWrapper = this.form;
			}
		}

		this.controlsWrapper = controlsWrapper;
		return controlsWrapper;
	}

	updateControls() {
		if ( this.controlsWrapper !== undefined && typeof this.controlsWrapper === 'object' ) {
			const controls = createElement(
				'fragment',
				{},
				[...Array.from(ObjValues(this.controls), ctr => ctr.data)]
				// Array.prototype.slice.call(ObjValues(this.controls), ctr => ctr.data)
			);

			const $controls = renderNode(controls);

			ObjValues(this.controls).forEach((ctr, i) => {
				const ctrElement = $controls.childNodes[i] as HTMLElement;
				ctr.element = ctrElement;
			});

			mountChildElements($controls, this.controlsWrapper);
		}
	}

	private removeControls() {
		ObjValues(this.controls).forEach((ctr) => {
			this.removeControl(ctr.key);
		});
		if (this.controlsWrapper !== undefined && this.controlsWrapper.className === 'wizerdform-controls') {
			this.controlsWrapper.parentNode?.removeChild(this.controlsWrapper);
		}
	}

	removeControl(key: string) {
		if (this.controls.hasOwnProperty(key)) {
			delete this.controls[key];
			this.updateControls();
		}
	}

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
	on(on: string, fn: Function): void {

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

	}

	private evtHandleInput(fn: Function): void {
		Array.prototype.forEach.call(this.getCurrentPage().getElements(), ( el ) => {
			el.addEventListener( 'keyup', (evt) => {
				// Prevent Bubbling
				if ( evt.target !== el ) {
					return;
				}

				const curVal = el.value;
				fn.bind(
					el,
					evt,
					{
						wizerdForm: this,
						el: el,
						value: curVal,
					}
				)();
			});
		});
	}

	private evtHandleValidationError(fn: Function): void {
		Array.prototype.forEach.call(this.getCurrentPage().getElements(), ( formField ) => {
			formField.addEventListener('wizerdForm_validationFailed', (evt) => {
				fn.bind(
					formField,
					evt,
					{
						wizerdForm: this,
						el: formField,
					}
				)();
			});
		} );
	}

	private evtHandleNavigation(fn: Function): void {
		this.form.addEventListener('wizerdForm_navigate', (evt) => {
			const curIndex = this.index;
			fn.bind(
				this,
				evt,
				{
					wizerdForm: this,
					index: curIndex,
				}
			)();
		});
	}

	private evtHandleSubmit(fn: Function): void {
		this.form.addEventListener('submit', (evt) => {
			fn.bind(
				this,
				evt,
				{
					wizerdForm: this
				}
			)();
		});
	}

}
