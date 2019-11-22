import {Linking} from 'react-native';
import {Log} from '../Log';
import Config from '../../config';

/**
 * Обертка над линкс. Открывает ссылку
 * @param {String} url  ссылка для открытия
 */
const onLinking = url => {
	Log('onLinking', url);

	Linking.canOpenURL(url)
		.then(supported => {
			if (!supported) {
				// Log('onLinking error');
			} else {
				return Linking.openURL(url);
			}
		})
		.catch(err => Log('onLinking error:', err));
};

const dbLink = {};
const onDeepStart = () => {
	Linking.getInitialURL()
		.then(url => {
			if (url) {
				Log(`Initial url is: ${url}`);
				dbLink[url] && dbLink[url]();
			}
		})
		.catch(err => Log('An error occurred', err));
};

/**
 * Установить слушателя на дип линк
 * @param {String} name маршрут диплинка
 * @param {Function} callback выполнить это
 */
const setHandlerDeepLink = (name, callback) => {
	dbLink[`${Config.deeplink}://${name}`] = callback;
};

export const Links = {
	onLinking,
	onDeepStart,
	setHandlerDeepLink,
};
