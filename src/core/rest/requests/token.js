const PORTAL = 'https://';

/**
 * Продление жизни токена
 * @param {*} params
 * @param {*} callBack
 */
export const refreshToken = async (params, callBack) => {
	const args = {
		refresh_token: params.token,
	};

	callBack('token', args.refresh_token, '123');
};
