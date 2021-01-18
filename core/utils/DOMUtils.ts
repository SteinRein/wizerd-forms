/**
 * Interfaces
 */
import { wizerdFormCreateElement } from '../interfaces/wizerdFormCreateElement';

/**
 * Internal Dependencies
 */
import { maybeCastArray } from './array';
import { ObjEntries } from './object';

/**
 * External Dependencies
 */
import { isFunction, isString } from "@s-libs/micro-dash";

/**
 * create Form Element
 */
export function createElement(tagName: string, props: Object = {}, children: Array<Object|Array<any>> = []): wizerdFormCreateElement {
	return {
		tagName,
		props,
		children
	};
}

export function renderElement(node: wizerdFormCreateElement): Node {
	let el;

	if (Array.isArray(node)) {
		node = createElement(node[0] || '', node[1] || {}, node[2] || []);
	}

	if ( node.tagName.toLowerCase() === 'fragment' ) {
		el = document.createDocumentFragment();
	} else {
		el = document.createElement(node.tagName);
	}
	
	// Set Attributes
	for (const [k, v] of ObjEntries(node.props)) {
		if ( k.lastIndexOf('on', 0) !== 0 ) { // exclude attributes that should trigger events
			el.setAttribute(k, v);
		}	else {
			el.addEventListener(k.slice(2).toLowerCase(), v);
		}
	}

	// Set Children
	node.children = maybeCastArray(node.children);
	if (node.children.length) {
		for (const child of node.children) {
			const $child = renderNode(child);
			el.appendChild($child);
		}
	}

	return el;
}

export function renderNode(node): Node {
	if (isFunction(node)) {
		node = node();
	}
	if (isString(node)) {
		return document.createTextNode(node);
	}
	return renderElement(node);
}

export function mountElements(node: Node, target): Node {
	target.replaceWith(node);
	return node;
}

export function mountChildElements(node: Node, target): Node {
	target.replaceChildren(node);
	return node;
}

//Returns true if it is a DOM node
export function isNode(o){
	return (
		typeof Node === "object" ? o instanceof Node :
		o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
	);
}

//Returns true if it is a DOM element
export function isElement(o){
	return (
		typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
		o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
	);
}

export default {
	createElement,
	renderNode,
	mountElements,
	mountChildElements,
	isNode,
	isElement
};
