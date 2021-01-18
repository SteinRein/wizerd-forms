export interface WizerdFormOptions {
	startIndex: number,
	pages: string,
	controlsPosition: 'bottom' | 'top',
	controlsWrapper: boolean | HTMLElement | DocumentFragment,
	hiddenPageClass: string,
	activePageClass: string,
}
