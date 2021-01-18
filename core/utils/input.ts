export const getInputValues = (elements: HTMLFormControlsCollection) => {
	const map: Object = {};
	Array.prototype.forEach.call(elements, (el) => {
		let value: any = null;
		switch (el.nodeName) {
			case 'INPUT':
				switch(el.type) {
					case 'checkbox':
					case 'radio':
						if (el.checked) {
							value = true;
						}
						break;
					default:
						break;
				}
				break;
			case 'SELECT':
				switch(el.type) {
					case 'select-multiple':
						let multiple = [];
						for(let i = 0; i < el.options.length; i++) {
							if (el.options[i].selected) {
								multiple.push(el.options[i].value);
							}
						}
						value = multiple;
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}

		map[el.name] = (value === null) ? el.value : value;
	});
	return map;
}

export default {
	getInputValues,
}
