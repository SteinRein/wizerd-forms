/**
 * Internal Dependencies
 */
import { WizerdForm } from "./wizerdForm";

/**
 * wɪzə(r)d Form Page
 * Author: Bastian Fießinger @SteinRein
 * Version: 0.0.1
 */
export class WizerdFormPage {

	/**
	 * wɪzə(r)d Form Page Constructor
	 *  
	 * @param {WizerdForm} form 
	 * @param {HTMLElement} page
	 * @param {number} index
	 */
	constructor( wizerdForm, page, index ) {

		if ( ! wizerdForm instanceof WizerdForm ) {
			throw new TypeError('param 1 of WizerdFormPage must be typeof WizerdForm');
		}

		this.form = wizerdForm;
		this.page = page;
		this.elements = page.elements;
		this.index = index;

	}

	show() {
		this.page.classList.remove( this.form.options.page_hidden_class );
		this.page.classList.add( this.form.options.page_active_class );
	}

	hide() {
		this.page.classList.remove( this.form.options.page_active_class );
		this.page.classList.add( this.form.options.page_hidden_class );
	}

	/**
	 * Primitive Validation
	 * 
	 * For browsers above IE9 use the HTMLInputElement's API checkValidity function
	 * prior check if required form fields have any value
	 * 
	 * pattern validations won't work prior IE9
	 * 
	 * @return {boolean} validation status
	 */
	validate() {

		let valid = true;

		const eventValidationFailed = new Event(
			'wizerdForm_validationFailed'
		);

		if ( HTMLInputElement.prototype.checkValidity ) {
			
			Array.prototype.forEach.call( this.elements, ( field ) => {
				if ( ! field.checkValidity() ) {
					field.classList.add('has-error');
					field.dispatchEvent( eventValidationFailed );
					valid = false;
				}
			} ); 

		} else {

			const curPageMandatoryFields = [...this.page.querySelectorAll('[required]')];

			curPageMandatoryFields.forEach( ( field ) => {
				if (field.value === null || field.value.trim() === '') {
					field.classList.add('has-error');
					field.dispatchEvent( eventValidationFailed );
					valid = false;
				}
			} );

		}

		return valid;

	}

}

export default WizerdFormPage;
