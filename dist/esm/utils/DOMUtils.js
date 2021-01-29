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
export function createElement(tagName, props, children) {
    if (props === void 0) { props = {}; }
    if (children === void 0) { children = []; }
    return {
        tagName: tagName,
        props: props,
        children: children
    };
}
export function renderElement(node) {
    var el;
    if (Array.isArray(node)) {
        node = createElement(node[0] || '', node[1] || {}, node[2] || []);
    }
    if (node.tagName.toLowerCase() === 'fragment') {
        el = document.createDocumentFragment();
    }
    else {
        el = document.createElement(node.tagName);
    }
    // Set Attributes
    for (var _i = 0, _a = ObjEntries(node.props); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        if (k.indexOf('on', 0) === 0) { // exclude attributes that should trigger events
            el.addEventListener(k.slice(2).toLowerCase(), v);
        }
        else if (el[k] !== 'undefined') {
            el[k] = v;
        }
        else {
            el.setAttribute(k, v);
        }
    }
    // Set Children
    node.children = maybeCastArray(node.children);
    if (node.children.length) {
        for (var _c = 0, _d = node.children; _c < _d.length; _c++) {
            var child = _d[_c];
            var $child = renderNode(child);
            el.appendChild($child);
        }
    }
    return el;
}
export function renderNode(node) {
    if (isFunction(node)) {
        node = node();
    }
    if (isString(node)) {
        return document.createTextNode(node);
    }
    return renderElement(node);
}
export function mountElements(node, target) {
    target.replaceWith(node);
    return node;
}
export function mountChildElements(node, target) {
    target.replaceChildren(node);
    return node;
}
//Returns true if it is a DOM node
export function isNode(o) {
    return (typeof Node === "object" ? o instanceof Node :
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
}
//Returns true if it is a DOM element
export function isElement(o) {
    return (typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
}
export default {
    createElement: createElement,
    renderNode: renderNode,
    mountElements: mountElements,
    mountChildElements: mountChildElements,
    isNode: isNode,
    isElement: isElement
};
//# sourceMappingURL=DOMUtils.js.map