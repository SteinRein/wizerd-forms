define(["require", "exports", "./array", "./object", "@s-libs/micro-dash"], function (require, exports, array_1, object_1, micro_dash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * create Form Element
     */
    function createElement(tagName, props, children) {
        if (props === void 0) { props = {}; }
        if (children === void 0) { children = []; }
        return {
            tagName: tagName,
            props: props,
            children: children
        };
    }
    exports.createElement = createElement;
    function renderElement(node) {
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
        for (var _i = 0, _a = object_1.ObjEntries(node.props); _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            if (k.lastIndexOf('on', 0) !== 0) { // exclude attributes that should trigger events
                el.setAttribute(k, v);
            }
            else {
                el.addEventListener(k.slice(2).toLowerCase(), v);
            }
        }
        // Set Children
        node.children = array_1.maybeCastArray(node.children);
        if (node.children.length) {
            for (var _c = 0, _d = node.children; _c < _d.length; _c++) {
                var child = _d[_c];
                var $child = renderNode(child);
                el.appendChild($child);
            }
        }
        return el;
    }
    exports.renderElement = renderElement;
    function renderNode(node) {
        if (micro_dash_1.isFunction(node)) {
            node = node();
        }
        if (micro_dash_1.isString(node)) {
            return document.createTextNode(node);
        }
        return renderElement(node);
    }
    exports.renderNode = renderNode;
    function mountElements(node, target) {
        target.replaceWith(node);
        return node;
    }
    exports.mountElements = mountElements;
    function mountChildElements(node, target) {
        target.replaceChildren(node);
        return node;
    }
    exports.mountChildElements = mountChildElements;
    //Returns true if it is a DOM node
    function isNode(o) {
        return (typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
    }
    exports.isNode = isNode;
    //Returns true if it is a DOM element
    function isElement(o) {
        return (typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
    }
    exports.isElement = isElement;
    exports.default = {
        createElement: createElement,
        renderNode: renderNode,
        mountElements: mountElements,
        mountChildElements: mountChildElements,
        isNode: isNode,
        isElement: isElement
    };
});
//# sourceMappingURL=DOMUtils.js.map