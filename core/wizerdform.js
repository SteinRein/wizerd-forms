/**
 * wɪzə(r)d Forms
 * Author: Bastian Fießinger @SteinRein
 * Version: 0.0.1
 */
export class WizerdForm {

	/**
	 * wɪzə(r)d Form Constructor
	 *  
	 * @param {HTMLFormElement} form 
	 * @param {number} startIndex 
	 * @param {object} options 
	 */
	constructor( form, startIndex = 0, options =  {} ) {

		// Setup wɪzə(r)d Form options
    const defaults = {
			pages: '.wizerdform-page',
			exclude_form_fieldtypes: [
				'fieldset', 
				'button'
			],
			controls_position: 'bottom',
			// Classes
			page_hidden_class: 'wizerdform-hidden-page',
			page_active_class: 'wizerdform-active-page',
			progressbar_class: 'wizerdform-progress',
			// Messages
			prev_btn_text: 'Previous',
			next_btn_text: 'Next',
			submit_text: null
		};

		options = options || {};
		for (var opt in defaults) {
			if (defaults.hasOwnProperty(opt) && ! options.hasOwnProperty(opt)) {
				options[opt] = defaults[opt];
			}
		}

		this.options = options;

		// Elements
		this.form = form;
		this.pages = ( NodeList.prototype.isPrototypeOf(this.options.pages) || HTMLCollection.prototype.isPrototypeOf(this.options.pages) ) ? [...this.options.pages] : [...form.querySelectorAll(this.options.pages)];
		this.formFields = this.getFormFields(this.options.exclude_form_fieldtypes);
		this.prevButton =
		this.nextButton =
		this.progressBar = null;

		// Page Parameters
		this.curIndex = startIndex;

		// Form Values
		this.values = {};

	}

	/**
	 * Initialize wɪzə(r)d Form
	 */
	init() {
		this.__addControls();
		this.goToPage(this.curIndex);
		this.__delegateEvents();
	}

	/**
	 * Destroy wɪzə(r)d Form
	 */
	destroy() {
		this.__removeControls();
		this.goToPage(0);
		this.__delegateEvents('remove');
	}

	/**
	 * Get Form fields
	 * 
	 * @param {*} exclude excluded fieldtypes
	 * 
	 * @return {Element[]} Array of formfield elements
	 */
	getFormFields(exclude = []) {
		const elements = [...this.form.elements];
		return elements.filter( element => {
			return exclude.indexOf( element.type ) < 0;
		} );
	}

	/**
	 * Set active page index
	 * @param {number} pageIndex 
	 * 
	 * @return {void}
	 */
	goToPage(pageIndex = 0) {
		if ( pageIndex < 0 ) {
			return false;
		}

		Array.prototype.forEach.call( this.pages, ( page ) => {
			page.classList.add( this.options.page_hidden_class );
		} );
		
		this.pages[pageIndex].classList.remove( this.options.page_hidden_class );
		this.pages[pageIndex].classList.add( this.options.page_active_class );

		this.prevButton.classList[pageIndex !== 0 ? 'remove' : 'add']('wizerdform-button-hidden');

		this.updateProgressBar(pageIndex);
	}

	/**
	 * Navigate the form
	 * @param {number} value amount of pages to move. Use negative numbers to move to previous pages.
	 * 
	 * @return {void|false} returns false on the last page
	 */
	navigateForm(value = 0) {
		if (
			(value === 1 && !this.validate()) || 
			(value === -1 && this.curIndex === 0)
		) {
			return false;
		}

		this.pages[this.curIndex].classList.remove( this.options.page_active_class );
		this.curIndex += value;

		const eventNavigate = new Event(
			'navigateWizerdForm',
			{
				bubbles: true
			}
		);
		this.form.dispatchEvent( eventNavigate );

		if (this.curIndex >= this.pages.length) {
			this.form.dispatchEvent( new Event('submit') );
			return false;
		}

		this.goToPage(this.curIndex);
	}

	setValues(additionalValues = {}) {

		for( key in additionalValues ) {
			this.values[key] = additionalValues[key];
		}

		const formElements = this.form.elements;
		Array.prototype.forEach.call( this.formFields, ( formField ) => {
			if ( formElements[formField.name] ) {
				this.values[formField.name] = formElements[formField.name].value
			}
		} );

	}

	/**
	 * Primitive Validation
	 * This function only checks if required form fields have any value
	 * 
	 * @return {boolean} validation status
	 */
	validate() {
		const curPageMandatoryFields = [...this.pages[this.curIndex].querySelectorAll('[required]')];
		let valid = true;

		curPageMandatoryFields.forEach( ( field ) => {
			if (field.value === null || field.value.trim() === '') {
				field.classList.add('has-error');
				valid = false;
			}
		} );

		return valid;

	}

	/**
	 * Remove classes added by validation
	 * 
	 * @return {void}
	 */
	clearErrors(e) {
		e.target.classList.remove('has-error');
	}

	updateProgressBar(pageIndex = 0) {
		this.progressBar.style.width = pageIndex * 100 / this.pages.length + '%';
	}

	__delegateEvents(action = 'add') {
		Array.prototype.forEach.call( this.formFields, ( formField ) => {
			if ( action !== 'remove' ) {
				// Clear Errors
				formField.addEventListener( 'keyup', this.clearErrors.bind(this) );
				formField.addEventListener( 'change', this.clearErrors.bind(this) );
				// Set Values
				formField.addEventListener( 'keyup', this.setValues.bind(this) );
				formField.addEventListener( 'change', this.setValues.bind(this) );		
			} else {
				// Clear Errors
				formField.removeEventListener( 'keyup', this.clearErrors.bind(this) );
				formField.removeEventListener( 'change', this.clearErrors.bind(this) );
				// Set Values
				formField.removeEventListener( 'keyup', this.setValues.bind(this) );
				formField.removeEventListener( 'change', this.setValues.bind(this) );			
			}
		} );

		if ( action !== 'remove' ) {
			this.prevButton.addEventListener( 'click', this.navigateForm.bind(this, -1) );
			this.nextButton.addEventListener( 'click', this.navigateForm.bind(this, 1) );
		} else {
			this.prevButton.removeEventListener( 'click', this.navigateForm.bind(this, -1) );
			this.nextButton.removeEventListener( 'click', this.navigateForm.bind(this, 1) );
		}
	}

	/**
	 * Add Form Controls
	 * 
	 * @return {void}
	 */
	__addControls() {
		const controlsWrapper = document.createElement('div');
		controlsWrapper.className = 'wizerdform-controls';

		const prevButton = document.createElement('button');
		prevButton.className = 'wizerdform-prev';
		prevButton.type = 'button';
		prevButton.innerText = this.options.prev_btn_text;

		const nextButton = document.createElement('button');
		nextButton.className = 'wizerdform-next';
		nextButton.type = 'button';
		nextButton.innerText = this.options.next_btn_text;

		const progressBar = document.createElement('div');
		progressBar.className = 'wizerdform-progress';

		const controls = [
			prevButton, 
			nextButton, 
			progressBar
		];

		controls.forEach( (ctr) => {
			controlsWrapper.appendChild(ctr);
		} );

		if ( this.options.controls_position !== 'top' ) {
			this.form.appendChild(controlsWrapper);
		} else {
			this.form.insertBefore(controlsWrapper, this.form.firstChild);
		}

		this.prevButton = prevButton;
		this.nextButton = nextButton;
		this.progressBar = progressBar;
	}

	/**
	 * Remove Form Controls
	 * 
	 * @return {void}
	 */
	__removeControls() {
		const controlsWrapper = this.form.querySelector('.wizerdform-controls');
		controlsWrapper.parentElement.removeChild(controlsWrapper);

		this.prevButton = 
		this.nextButton = 
		this.progressBar = null;
	}

	/**
	 * 
	 * @param {string} on 
	 * @param {CallableFunction} fn 
	 */
	on(on, fn) {

		switch ( on ) {
			case 'input':
				this.__handle_inputChange( fn );
				break;
			case 'navigate':
				this.__handle_navigate( fn );
				break;
		}

		return false;

	}

	__handle_inputChange( fn ) {
		Array.prototype.forEach.call( this.formFields, ( formField ) => {
			formField.addEventListener( 'change', fn.bind( this, {
				_wizerdForm: this,
				el: formField,
				value: formField.value,
			} ) );
		} );
	}

	__handle_navigate( fn ) {
		this.form.addEventListener( 'navigateWizerdForm', fn.bind( this, {
			_wizerdForm: this,
			page: this.curIndex
		} ) );
	}

}

export default WizerdForm;
