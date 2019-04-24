import {Linking} from 'react-native';

/**
 * Обертка над линкс. Открывает ссылку
 * @param {String} url  ссылка для открытия
 */
const onLinking = url => {
	Linking.canOpenURL(url)
		.then(supported => {
			if (!supported) {
				console.log('onLinking error');
			} else {
				return Linking.openURL(url);
			}
		})
		.catch(err => console.log('onLinking error:', err));
};

export const Links = {
	onLinking,
};
