export const ObjValues = (obj: Object): Array<any> => {
	return (!Object.values) ?
						Object.keys(obj).map(e => obj[e]) :
						Object.values(obj);
}

export const ObjEntries = (obj: Object): Array<any> => {
	return (!Object.entries) ?
						Object.keys(obj).map(key => [key, obj[key]]) :
						Object.entries(obj);
}
