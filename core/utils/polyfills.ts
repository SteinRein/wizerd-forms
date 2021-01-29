/**
 * ReplaceWith Polyfill
 * @link https://news.ycombinator.com/item?id=17613100
 */
if (Element.prototype.replaceWith === undefined) {
	Element.prototype.replaceWith = function(replacement: String | Node) {
		if (typeof replacement === "string") {
			replacement = this.ownerDocument.createTextNode(replacement);
		}
		this.parentNode.replaceChild(this, replacement);
	}
}

/**
 * replaceChildren Polyfill
 * @link https://github.com/yuzhe-han/ParentNode-replaceChildren
 */
if((Node as any).prototype.replaceChildren === undefined) {
	(Node as any).prototype.replaceChildren = function(addNodes: any) {
		while(this.lastChild) {
			this.removeChild(this.lastChild); 
		}
		if (addNodes !== undefined) {
			this.append(addNodes);
		}
	}
}