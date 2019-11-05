import Fetch from '../fetch';

export const getReactNative = async params => {
	console.log('request.other.requestTest: ', params);
	const response = await Fetch('https://facebook.github.io/react-native/', {
		method: 'GET',
		type: 'text',
	});
	console.log('response', response);
	// request
	return {ok: true};
};
