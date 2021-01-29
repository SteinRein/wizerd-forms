/**
 * ReplaceWith Polyfill
 * @link https://news.ycombinator.com/item?id=17613100
 */
if (Element.prototype.replaceWith === undefined) {
    Element.prototype.replaceWith = function (replacement) {
        if (typeof replacement === "string") {
            replacement = this.ownerDocument.createTextNode(replacement);
        }
        this.parentNode.replaceChild(this, replacement);
    };
}
/**
 * replaceChildren Polyfill
 * @link https://github.com/yuzhe-han/ParentNode-replaceChildren
 */
if (Node.prototype.replaceChildren === undefined) {
    Node.prototype.replaceChildren = function (addNodes) {
        while (this.lastChild) {
            this.removeChild(this.lastChild);
        }
        if (addNodes !== undefined) {
            this.append(addNodes);
        }
    };
}
//# sourceMappingURL=polyfills.js.map