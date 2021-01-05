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
	constructor( form, options =  {} ) {

		// Setup wɪzə(r)d Form options
    const defaults = {
			startIndex: 0,
			pages: '.wizerdform-page',
			// Controls
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
		this.formFields = this.getFormFields();
		this.prevButton =
		this.nextButton =
		this.progressBar = null;

		// Page Parameters
		this.curIndex = this.options.startIndex;

		// Form Values
		this.values = {};

	}

	/**
	 * Initialize the current wɪzə(r)d Form Instance.
	 * This Method will add navigation controls, move the form
	 * to it's startIndex and add all Event listeners.
	 */
	init() {
		this.__addControls();
		this.goToPage(this.curIndex);
		this.__delegateEvents();
	}

	/**
	 * Destroy the current wɪzə(r)d Form Instance.
	 * This Method will remove navigation controls, set the active
	 * pageIndex to 0 and remove all Event listeners.
	 */
	destroy() {
		this.__removeControls();
		this.goToPage(0);
		this.__delegateEvents(false);
	}

	/**
	 * Get Form fields
	 * filters all available form fields
	 * 
	 * @return {Element[]} Array of formfield elements
	 */
	getFormFields() {
		const elements = [...this.form.elements];
		return elements.filter( element => {
      if ( element.name !== '' && element.value !== '' ) {
        return element;
      }
		} );
	}

	/**
	 * Change the current page
	 * 
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

		if ( pageIndex !== 0 ) {
			this.prevButton.classList.remove('wizerdform-button-hidden');
		} else {
			this.prevButton.classList.add('wizerdform-button-hidden');
		}

		if ( this.options.submit_text ) {
			if (pageIndex === this.pages.length - 1) {
				this.nextButton.innerText = this.options.submit_text;
			} else {
				this.nextButton.innerText = this.options.next_btn_text;
			}
		}

		this.updateProgressBar(pageIndex);
	}

	/**
	 * Navigate the form
	 * 
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

		const eventNavigate = new Event(
			'wizerdForm_navigate',
			{
				cancelable: true
			}
		);
		this.form.dispatchEvent( eventNavigate );

		if (this.curIndex === this.pages.length - 1 && value > 0) {
			const wizerdFormSubmitEvent = document.createEvent('HTMLEvents');
			wizerdFormSubmitEvent.initEvent('submit', true, true);
			wizerdFormSubmitEvent.eventName = 'submit';
			this.form.dispatchEvent(wizerdFormSubmitEvent);
		} else {
			this.curIndex += value;
		}

		this.goToPage(this.curIndex);
	}

	/**
	 * Set form values. setValues will check all formfields and save their
	 * values to it's instance values variable.
	 * 
	 * Use the additionalValues param to add your own form values.
	 * 
	 * @param {object} additionalValues
	 */
	setValues(additionalValues = {}) {

		for( const key in additionalValues ) {
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
			'wizerdForm_validationFailed',
			{
				bubbles: true
			}
		);

		if ( HTMLInputElement.prototype.checkValidity ) {
			
			const curPageFields = [...this.pages[this.curIndex].elements];
			curPageFields.forEach( ( field ) => {
				if ( ! field.checkValidity() ) {
					field.classList.add('has-error');
					field.dispatchEvent( eventValidationFailed );
					valid = false;
				}
			} ); 

		} else {

			const curPageMandatoryFields = [...this.pages[this.curIndex].querySelectorAll('[required]')];

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

	/**
	 * Remove error classes added by validation
	 * 
	 * @return {void}
	 */
	clearErrors(e) {
		e.target.classList.remove('has-error');
	}

	/**
	 * Update progressbar width according to the current page
	 * 
	 * @param {number} pageIndex 
	 * 
	 * @return {void}
	 */
	updateProgressBar(pageIndex = 0) {
		this.progressBar.style.width = (pageIndex + 1) * 100 / this.pages.length + '%';
	}

	/**
	 * delegate events
	 * 
	 * @param {boolean} add add or remove event listeners 
	 */
	__delegateEvents(add = true) {
		Array.prototype.forEach.call( this.formFields, ( formField ) => {
			if ( add ) {
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

		if ( add ) {
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
		prevButton.innerHTML = this.options.prev_btn_text;

		const nextButton = document.createElement('button');
		nextButton.className = 'wizerdform-next';
		nextButton.type = 'button';
		nextButton.innerHTML = this.options.next_btn_text;

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
	 * Custom Callback functions.
	 * 
	 * available callbacks:
	 * 
	 * input: fires whenever an input changes
	 * 
	 * error: fires when validation fails
	 * 
	 * navigate: fires on navigation
	 * 
	 * @param {string} on 
	 * @param {CallableFunction} fn 
	 */
	on(on, fn) {

		switch ( on ) {
			case 'input':
			case 'change':
				this.__handle_inputChange( fn );
				break;
			case 'error':
				this.__handle_validation_error( fn );
				break;
			case 'navigate':
				this.__handle_navigate( fn );
				break;
		}

		return false;

	}

	__handle_inputChange( fn ) {
		Array.prototype.forEach.call( this.formFields, ( formField ) => {
			formField.addEventListener( 'keyup', (evt) => {
				
				// Prevent Bubbling
				if ( evt.target !== formField ) {
					return;
				}

				const curVal = formField.value;
				fn.bind( 
					formField, 
					evt, 
					{
						_wizerdForm: this,
						el: formField,
						value: curVal,
					} 
				)(); 
			} );
		} );
	}

	__handle_validation_error( fn ) {
		Array.prototype.forEach.call( this.formFields, ( formField ) => {
			formField.addEventListener( 'wizerdForm_validationFailed', (evt) => {
				fn.bind( 
					formField, 
					evt,
					{
						_wizerdForm: this,
						el: formField,
					}
				)();
			} );
		} );
	}

	__handle_navigate( fn ) {
		this.form.addEventListener( 'wizerdForm_navigate', (evt) => {

			const curIndex = this.curIndex;

			fn.bind( 
				this.form, 
				evt,
				{
					_wizerdForm: this,
					index: curIndex,
				}
			)();
		} );
	}

}

export default WizerdForm;
