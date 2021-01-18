/**
 * Interfaces
 */
import { wizerdFormCreateElement } from './interfaces/wizerdFormCreateElement';
export default class {
    key: string;
    data: wizerdFormCreateElement;
    element: HTMLElement | undefined;
    constructor(key: string, tagName: string, props: Object, children: any);
    /**
     * Wrapper function around addEventlistener
     *
     * @param type
     * @param listener
     * @param options
     */
    addEventListener(type: string, listener: EventListener, options?: EventListenerOptions | false): void;
}
