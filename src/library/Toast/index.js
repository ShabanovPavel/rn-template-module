import {Alert} from 'react-native';
import SimpleToast from 'react-native-simple-toast';

function Toast() {}

/**
 * @params buttons, title, message, cancelable
 */
Toast.alert = ({buttons, title, message, cancelable}) => {
	const arrayBtn = buttons.map(el => ({
		text: el.text,
		onPress: el.onAction || (() => {}),
	}));
	Alert.alert(title, message, arrayBtn, {
		cancelable,
	});
};

Toast.short = message => {
	SimpleToast.show(message, SimpleToast.SHORT);
};

Toast.showWithGravity = (message, position = 'BOTTOM') => {
	SimpleToast.showWithGravity(message, SimpleToast.SHORT, SimpleToast[position]);
};

Toast.requestError = (text = '') => {
	const message = text === '' ? 'Что-то пошло не так' : text;
	Toast.alert({
		title: 'Ошибка',
		message,
		buttons: [
			{
				text: 'OK',
				onAction: () => {},
			},
		],
		cancelable: true,
	});
};

Toast.requestWarning = (text = '') => {
	const message = text === '' ? 'Что-то пошло не так' : text;
	Toast.alert({
		title: 'Предупреждение',
		message,
		buttons: [
			{
				text: 'OK',
				onAction: () => {},
			},
		],
		cancelable: true,
	});
};

/**
 * Отображение собщения
 * @param {String} text сообщение
 * @param {Boolean} isShort флаг вывода тоста иначе алерт
 */
Toast.show = (text = '', isShort = true) => {
	const message = text === '' ? 'Что-то пошло не так' : text;
	if (isShort) {
		Toast.short(message);
	} else {
		Toast.requestError(message);
	}
};

export {Toast};
