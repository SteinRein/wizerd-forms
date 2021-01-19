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
							map[el.name] = (el.value === undefined || el.value === '') ? true : el.value;
						}
						break;
					default:
						map[el.name] = el.value;
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
						map[el.name] = multiple;
						break;
					default:
						map[el.name] = el.value;
						break;
				}
				break;
			default:
				break;
		}
	});
	return map;
}

export default {
	getInputValues,
}
