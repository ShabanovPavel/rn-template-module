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

Toast.show = (message, type = 'SHORT') => {
	SimpleToast.show(message, SimpleToast.SHORT);
};

Toast.showWithGravity = (message, type = 'SHORT', position = 'BOTTOM') => {
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

export {Toast};
