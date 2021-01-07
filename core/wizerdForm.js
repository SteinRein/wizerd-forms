/**
 * Internal Dependencies
 */
import { WizerdFormPage } from './wizerdFormPage';
import { isDOM } from './utils/isDOM';

/**
 * External Dependencies
 */
import { isString } from '@s-libs/micro-dash';

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
		this.pages = this.initPages();
		this.formFields = form.elements;
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
	 * Get initial pages
	 */
	initPages() {
		const p = ( NodeList.prototype.isPrototypeOf(this.options.pages) || HTMLCollection.prototype.isPrototypeOf(this.options.pages) ) ? [...this.options.pages] : [...this.form.querySelectorAll(this.options.pages)];
		Array.prototype.forEach.call( p, (page) => {
			this.__setPageAttributes(page);
		} );
		return this.readPages();
	}

	/**
	 * Setup available wɪzə(r)d Form Pages
	 */
	readPages() {
		const pageList = [...this.form.querySelectorAll('[data-wizerdform-page]')];
		let pages = [];
		Array.prototype.forEach.call( pageList, (page, index) => {
			const wizerdFormPage = new WizerdFormPage( this, page, index );
			pages.push(wizerdFormPage);
		} );
		return pages;
	}

	/**
	 * Insert page by HTML string
	 * The first parameter may contain a callable function that must return either
	 * a string or a DOM Element.
	 * 
	 * After that reset wɪzə(r)d Form Pages and move to the current index
	 * 
	 * @param {string|function} page 
	 * @param {number} index 
	 */
	insertPage(page, index = -1) {

		if ( typeof page === 'function' ) {
			page = page();
		}

		let wizerdFormPageNode;

		if ( isString(page) && page !== '' ) {
			wizerdFormPageNode = this.__buildPageFromString(page);
		} else if ( isDOM( page ) ) {
			wizerdFormPageNode = this.__buildPageFromDOMNode(page);
		} else {
			throw new TypeError('Page creation failed. Parameter 1 of insertPage must return a valid string or DOM Element.');
		}

		if ( index < 0 || index > this.pages.length ) {
			index = this.pages.length;
		}

		let reference = this.pages[index];
		if ( typeof reference !== 'undefined' ) {
			this.form.insertBefore( wizerdFormPageNode, reference.page );
		} else {
			this.form.insertBefore( wizerdFormPageNode, this.pages[index - 1].page.nextSibling);
		}

		this.pages = this.readPages();
		this.goToPage(this.curIndex);

	}

	/**
	 * Create a valid DOM Element from string and create a wrapper
	 * if there are multiple Elements present
	 * 
	 * @param {string} str 
	 * 
	 * @return {DocumentFragment}
	 */
	__buildPageFromString(str) {

		let pageFragment = document.createDocumentFragment();
		let temp = document.createElement('div');
		pageFragment.appendChild(temp);
		temp.insertAdjacentHTML('beforebegin', str);
		pageFragment.removeChild(temp);

		if ( pageFragment.children.length > 1 ) {
			let wizerdFormPageWrapper = document.createElement('div');
			while ( pageFragment.firstChild ) {
				wizerdFormPageWrapper.appendChild(pageFragment.firstChild);
			}
			pageFragment.appendChild(wizerdFormPageWrapper);
		}

		this.__setPageAttributes(pageFragment.firstElementChild);

		return pageFragment;

	}

	__buildPageFromDOMNode(DOMNode) {
		this.__setPageAttributes(DOMNode);
		return DOMNode;
	}

	__setPageAttributes(page) {
		page.setAttribute('data-wizerdform-page', true);
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
			page.hide();
		} );

		this.pages[pageIndex].show();

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
			(value === 1 && !this.pages[this.curIndex].validate()) || 
			(value === -1 && this.curIndex === 0)
		) {
			return false;
		}

		this.pages[this.curIndex].hide();

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

		Array.prototype.forEach.call( this.getFormFields(), ( formField ) => {
			if ( this.formFields[formField.name] ) {
				this.values[formField.name] = this.formFields[formField.name].value
			}
		} );

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
			const curPage = this.pages[curIndex];

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
