/**
 * @module App/Methods
 * @description логика модуля
 * @private
 */
import Orientation from 'react-native-orientation';
import {
	APP_INIT,
	APP_OPEN_ONBOARDING,
	APP_OPEN_PLAYGROUND,
	APP_UPDATE_NET_CONNECT,
	APP_OPEN_INDICATORS,
} from './action';
import {Request, ManagerRequest} from '../rest';
import {showOverlay, dismissOverlay} from '../navigation';
import {Theme, SplashScreen, Log} from '../../library';
import Looper from '../looper';

const self = {};
/**
 * Запускается сценарий
 * @param {Object} app_self
 */
self.loadApp = app_self => dispatch => {
	// Тема ()/('default') -стандартная , ('black') - темная
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
	dispatch({type: APP_INIT}); // Прила инициализирована
	Orientation.lockToPortrait(); // Ориентация приложения зафиксирована
	app_self.forceUpdate();

	SplashScreen(); // отключаем нативный сплэш

	// Пример запроса
	Request(
		'login', // имя метода
		{}, // параметры
		res => {
			Log('success', res);
		},
		res => {
			Log('error', res); // или любая другая логика на отрицательный результат
		},
	);
};

/**
 *  Выполняет ожидание прогрузки состояний хранилища
 */
self.onInit = app_self => (dispatch, getState) => {
	Looper.start('WaitPersist', () => {
		const {isLoadPersistStore} = getState().nav;
		if (isLoadPersistStore) {
			Looper.stop('WaitPersist');
			dispatch(self.loadApp(app_self));
		}
	});
};

export default self;
