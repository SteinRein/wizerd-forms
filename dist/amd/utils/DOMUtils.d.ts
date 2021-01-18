/**
 * Interfaces
 */
import { wizerdFormCreateElement } from '../interfaces/wizerdFormCreateElement';
/**
 * create Form Element
 */
export declare function createElement(tagName: string, props?: Object, children?: Array<Object | Array<any>>): wizerdFormCreateElement;
export declare function renderElement(node: wizerdFormCreateElement): Node;
export declare function renderNode(node: any): Node;
export declare function mountElements(node: Node, target: any): Node;
export declare function mountChildElements(node: Node, target: any): Node;
export declare function isNode(o: any): boolean;
export declare function isElement(o: any): boolean;
declare const _default: {
    createElement: typeof createElement;
    renderNode: typeof renderNode;
    mountElements: typeof mountElements;
    mountChildElements: typeof mountChildElements;
    isNode: typeof isNode;
    isElement: typeof isElement;
};
export default _default;
