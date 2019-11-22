import Fetch from '../fetch';

export const getReactNative = async params => {
	const {UrlHost} = params;
	const response = await Fetch('https://facebook.github.io/react-native/', {
		method: 'GET',
		type: 'text',
	});
	return response;
};

export const getStory = async params => {
	const {UrlHost, idStory} = params;
	const response = await Fetch(`${UrlHost}/getStory`, {
		method: 'GET',
		type: 'json',
		params: {idStory},
	});
	return response;
};

export const getStoryList = async params => {
	const {UrlHost} = params;
	const response = await Fetch(`${UrlHost}/getStoryList`, {
		method: 'GET',
		type: 'json',
	});
	return response;
};
