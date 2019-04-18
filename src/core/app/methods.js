/**
 * @module App/Methods
 * @description логика модуля
 * @private
 */
import {APP_INIT, APP_OPEN_ONBOARDING, APP_OPEN_PLAYGROUND, APP_UPDATE_NET_CONNECT} from './action';
import {Request, ManagerRequest} from '../rest';
import {showOverlay, dismissOverlay} from '../navigation';
import {Theme} from '../../library';

/**
 *  Выполняет проверку состояний на запускаемый сценарий приложения
 */
export const onInit = () => dispatch => {
	// Тема
	Theme.setTheme();
	// Поддерживает статус соединения постоянно
	ManagerRequest.listenerNetConnected(
		() => {
			dispatch({type: APP_UPDATE_NET_CONNECT, isConnected: true});
			dismissOverlay('offline');
		},
		() => {
			dispatch({type: APP_UPDATE_NET_CONNECT, isConnected: false});
			showOverlay('offline', {
				overlay: {
					interceptTouchOutside: false,
				},
			});
		},
	);
	dispatch({type: APP_INIT});

	// Пример запроса
	Request(
		'login', // имя метода
		{}, // параметры
		res => {
			console.log('success', res);
		},
		res => {
			console.log('error', res); // или любая другая логика на отрицательный результат
		},
	);
};

/**
 * Открывает модуль рекламы
 */
export const onOpenOnboarding = () => dispatch => {
	dispatch({type: APP_OPEN_ONBOARDING});
};

/**
 * Открывает модуль эксперементовы
 */
export const onOpenPlayground = () => dispatch => {
	dispatch({type: APP_OPEN_PLAYGROUND});
};
