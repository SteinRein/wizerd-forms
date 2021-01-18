/**
 * Interfaces
 */
import { wizerdFormCreateElement } from './interfaces/wizerdFormCreateElement';

/**
 * Internal Dependencies
 */
import { createElement } from './utils/DOMUtils';
import { maybeCastArray } from './utils/array';

export default class {

	key: string;
	data: wizerdFormCreateElement;
	element: HTMLElement | undefined;

	constructor(key: string, tagName: string, props: Object, children) {
		
		children = maybeCastArray(children);
		
		this.key = key;
		this.data = createElement(tagName, props || {}, children || []);
		this.element = undefined;

	}

	/**
	 * Wrapper function around addEventlistener
	 * 
	 * @param type 
	 * @param listener 
	 * @param options 
	 */
	addEventListener(type: string, listener: EventListener, options: EventListenerOptions | false = false): void {
		document.addEventListener(
			type,
			(evt) => {
				let { target } = evt;
				const { element } = this;

				if ( element === undefined || target === null || ! element.contains(target as Node) ) {
					return;
				}
				listener(evt);				
			},
			options
		);
	}

}
