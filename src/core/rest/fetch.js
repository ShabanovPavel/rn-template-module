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

/**
 * Выполняет асинхронный запрос
 *
 * @export
 * @param {String} url урл запроса
 * @param {Object} config конфигурация запроса
 * @param {String} config.method тип запроса
 * @param {String} config.headers голова запроса
 * @param {String} config.params параметры которые будут мерджится с урл запросом
 * @param {String} config.body тело запоса (чаще используется в пост запросах)
 * @param {String} config.type тип ответа (json, text, blob)
 *
 * @returns
 */
export default async function App_Service(url, config) {
	const {method, headers, params, body, type = 'json'} = config;
	const header = {};
	let urls = url;

	header.Accept = 'application/json';
	header['Content-Type'] = 'application/json';

	const reqBody = {
		method,
		headers: {...header, ...headers},
	};

	if (params) {
		urls += `?${formDataToString(params)}`;
	}
	if (body) {
		reqBody.body = body;
	}

	return fetch(urls, reqBody)
		.then(response => {
			Log('REST fetch response', response);
			return response[type]();
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
