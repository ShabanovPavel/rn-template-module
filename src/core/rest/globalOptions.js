export const headers = new Headers({
	'Content-Type': 'application/json',
	accept: 'application/json',
});

export const Response = async (res, callback) => {
	const json = await res.json();
	if (json.success) {
		callback({ok: true, result: json});
	} else {
		callback({ok: false, result: `Code: ${json.statusCode} Des:${json.statusDescription}`});
	}
};

export const formDataToString = formDataObject => {
	this.formDataString = '';
	Object.keys(formDataObject).forEach(key => {
		this.formDataString += `&${key}=${encodeURIComponent(formDataObject[key])}`;
	});
	return this.formDataString.slice(1);
};
