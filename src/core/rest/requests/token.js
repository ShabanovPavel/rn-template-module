import Fetch from '../fetch';
/**
 * Продление жизни токена
 * @param {*} params
 * @param {*} callBack
 */
export const refreshToken = async params => {
	const {} = params;

	// const response = await Fetch(`${PORTAL}/account/token/`, {
	// 	method: 'POST',
	// 	headers: {
	// 		Accept: '*/*',
	// 		'Content-Type': ' application/x-www-form-urlencoded',
	// 	},
	// 	params: {},
	// 	body: {
	// 		refresh_token,
	// 	},
	// });

	// return response;

	// Response(response, async res => {
	// 	if (res.ok) {
	// 		await setItem('token_info', res.result);
	// 		await setItem('token', res.result.access_token);
	// 		await setItem('token_type', res.result.token_type);
	// 		await setItem('token_time', res.result.expires_in * 1000 + Date.now());
	// 		callback(res);
	// 	} else {
	// 		callback(res);
	// 	}
	// });
	return {ok: true};
};
