/**
 * @module App/Methods
 * @description логика модуля
 * @private
 */
import {APP_INIT, APP_UPDATE_NET_CONNECT} from './action';
import {Request, ManagerRequest} from '../rest';
import {showOverlay, dismissOverlay} from '../navigation';
import {Theme, SplashScreen, Log, Looper, Toast} from '../../library';

const self = {};
/**
 * Запускается сценарий
 * @param {Object} app_self
 */
self.loadApp = app_self => dispatch => {
	dispatch({type: APP_INIT}); // Прила инициализирована

	app_self.forceUpdate();

	SplashScreen(); // отключаем нативный сплэш

	// TODO test REST
	// for (let i = 0; i < 100; i += 1) {
	// 	// Пример запроса
	// 	Request(
	// 		'getReactNative', // имя метода
	// 		{}, // параметры
	// 		res => {
	// 			Log('success', res);
	// 		},
	// 		res => {
	// 			Log('error', res); // или любая другая логика на отрицательный результат
	// 		},
	// 		500,
	// 	);
	// }
};

/**
 *  Выполняет ожидание прогрузки состояний хранилища
 */
self.onInit = app_self => (dispatch, getState) => {
	// Тема ()/('default') -стандартная , ('black') - темная
	Theme.setTheme();
	// Поддерживает статус соединения постоянно
	ManagerRequest.listenerNetConnected(
		() => {
			dispatch({type: APP_UPDATE_NET_CONNECT, isConnected: true});
			// dismissOverlay('offline');
		},
		() => {
			dispatch({type: APP_UPDATE_NET_CONNECT, isConnected: false});
			// showOverlay('offline');
		},
	);

	Looper.start('WaitPersist', () => {
		const {isLoadPersistStore} = getState().nav;
		if (isLoadPersistStore) {
			Looper.stop('WaitPersist');
			dispatch(self.loadApp(app_self));
		}
	});
};

export default self;
