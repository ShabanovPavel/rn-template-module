import {Alert} from 'react-native';
import SimpleToast from 'react-native-simple-toast';

function Toast() {}

/** Массив запросов */
const PoolRequest = [];

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

Toast.requestError = (text = '', action = () => {}) => {
	const message = text === '' ? 'Что-то пошло не так' : text;
	if (!PoolRequest.includes(message)) {
		Toast.alert({
			title: 'Ошибка',
			message,
			buttons: [
				{
					text: 'OK',
					onAction: () => {
						action();
						const index = PoolRequest.indexOf(message);
						setTimeout(() => {
							PoolRequest.splice(index, 1);
						}, 2 * 1000);
					},
				},
			],
			cancelable: true,
		});
		PoolRequest.push(message);
		const index = PoolRequest.indexOf(message);
		setTimeout(() => {
			PoolRequest.splice(index, 1);
		}, 2 * 1000);
	}
};

Toast.requestAlert = (text = '', title, action = () => {}) => {
	const message = text === '' ? 'Что-то пошло не так' : text;
	if (!PoolRequest.includes(message)) {
		Toast.alert({
			title,
			message,
			buttons: [
				{
					text: 'OK',
					onAction: () => {
						action();
						const index = PoolRequest.indexOf(message);
						setTimeout(() => {
							PoolRequest.splice(index, 1);
						}, 2 * 1000);
					},
				},
			],
			cancelable: true,
		});
		PoolRequest.push(message);
		const index = PoolRequest.indexOf(message);
		setTimeout(() => {
			PoolRequest.splice(index, 1);
		}, 2 * 1000);
	}
};

/**
 * Отображение собщения
 * @param {String} text сообщение
 * @param {String} title заголовок
 * @param {Function} action функция заголовок
 */
Toast.show = (text = '', title, action = () => {}) => {
	const message = text === '' ? 'Что-то пошло не так' : text;

	if (title === undefined) {
		Toast.short(message);
	} else {
		Toast.requestAlert(message, title, action);
	}
};

export {Toast};
