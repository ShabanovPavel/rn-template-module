import {set, isEmpty} from 'lodash';
import {Log} from '../../library';

const formDataToString = formDataObject => {
	this.formDataString = '';
	Object.keys(formDataObject).forEach(key => {
		if (formDataObject[key] !== null && formDataObject[key] !== undefined) {
			if (typeof formDataObject[key] !== 'object') {
				this.formDataString += `&${key}=${encodeURIComponent(formDataObject[key])}`;
			} else {
				formDataObject[key].forEach((el, index) => {
					this.formDataString += `&${key}[${index}]=${encodeURIComponent(JSON.stringify(el))}`;
				});
			}
		}
	});
	return this.formDataString.slice(1);
};

export default async function App_Service(url, {method, headers, params, body}) {
	const header = {};
	let urls = url;

	set(header, 'Accept', 'application/json');
	set(header, 'Content-Type', 'application/json');

	const reqBody = {
		method,
		headers: {...header, ...headers},
	};

	if (!isEmpty(params)) {
		urls += `?${formDataToString(params)}`;
	}
	if (!isEmpty(body)) {
		reqBody.body = JSON.stringify(body);
	}

	return fetch(urls, reqBody)
		.then(response => {
			Log('REST fetch response', response);
			return response.json();
		})
		.then(data => {
			return {
				ok: true,
				data,
			};
		})
		.catch(() => {
			return {
				ok: false,
				message: 'Please check your internet connection!',
			};
		});
}
