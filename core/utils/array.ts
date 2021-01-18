export const maybeCastArray = (data) => {
	if ( ! Array.isArray(data) ) {
		data = (data) ? [data] : [];
	}
	return data;
}

export default {
	maybeCastArray,
}
