export const Response = async (res, callback) => {
	const json = await res.json();
	let respon = {};
	if (json.success) {
		respon = {ok: true, result: json};
	} else {
		respon = {ok: false, result: `Code: ${json.statusCode} Des:${json.statusDescription}`};
	}
	callback(respon);
};

export const formDataToString = formDataObject => {
	this.formDataString = '';
	Object.keys(formDataObject).forEach(key => {
		this.formDataString += `&${key}=${encodeURIComponent(formDataObject[key])}`;
	});
	return this.formDataString.slice(1);
};
