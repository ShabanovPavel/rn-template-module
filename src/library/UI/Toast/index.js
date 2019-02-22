import {Alert} from 'react-native';
import SimpleToast from 'react-native-simple-toast';

/**
 * Выводит информацию алертом или кастомным боксом
 *
 * @class Toast
 */
class Toast {}

/**
 * Вывод модального окна на эран
 * @param {Object} params - объект содержащий buttons - массив кнопок,title-заголовок message-сообщение пользователю,cancelable-?
 * @memberof Toast
 */
Toast.alert = ({buttons, title, message, cancelable}) => {
	const arrayBtn = buttons.map(el => ({
		text: el.text,
		onPress: () => el.onAction(),
	}));
	Alert.alert(title, message, arrayBtn, {
		cancelable,
	});
};

/**
 * Вывод кастомного сообщения
 *
 * @param {String} message  сообшение
 * @param {String} type  тип отображения
 * @memberof Toast
 */
Toast.show = (message, type = 'SHORT') => {
	SimpleToast.show(message, SimpleToast[type]);
};

/**
 *
 * @memberof Toast
 */
Toast.showWithGravity = (message, type = 'SHORT', position = 'BOTTOM') => {
	SimpleToast.showWithGravity(message, SimpleToast[type], SimpleToast[position]);
};

export {Toast};
