/**
 * Internal Dependencies
 */
import { getInputValues } from './utils/input';
import { validateInput } from './utils/validation';

export default class {

	page: HTMLElement;
	index: number;
	options: any;

	constructor(page: HTMLElement, index: number, options = {}) {
		this.page = page;
		this.index = index;
		this.options = options || {};

		this.applyPageAttributes();
	}

	applyPageAttributes() {
		this.page.setAttribute('data-wizerdform-page', '');
	}

	removePageAttributes() {
		this.page.removeAttribute('data-wizerdform-page');
	}

	show() {
		this.page.classList.remove( this.options.hiddenPageClass );
		this.page.classList.add( this.options.activePageClass );
	}

	hide() {
		this.page.classList.remove( this.options.activePageClass );
		this.page.classList.add( this.options.hiddenPageClass );
	}

	/**
	 * get current Page Elements
	 *
	 * @return {HTMLFormControlsCollection}
	 */
	getElements(): HTMLFormControlsCollection {
		return this.page.getElementsByClassName('wizerdform-element');
	}

	/**
	 * Get Values of current Page
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
	 * Primitive Validation
	 *
	 * For browsers above IE9 use the HTMLInputElement's API checkValidity function
	 * prior use a custom validation that is similar to the browsers default.
	 *
	 * @return {boolean} validation status
	 */
	validate() {

		let valid: boolean = true;
		let fieldValidated: HTMLElement | undefined;

		const eventValidationFailed = new Event(
			'wizerdForm_validationFailed'
		);

		const elements: HTMLFormControlsCollection = this.getElements();
		Array.prototype.forEach.call( elements, ( field ) => {
			fieldValidated = field;
			valid = validateInput(field);
		} );

		if (valid !== true && fieldValidated) {
			fieldValidated.classList.add('has-error');
			fieldValidated.dispatchEvent( eventValidationFailed );
		}

		return {
			valid: valid,
			field: fieldValidated
		};

	}

}
