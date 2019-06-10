/**
 * @module App/Methods
 * @description логика модуля
 * @private
 */
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

/** Запускается сценарий */
const loadApp = self => dispatch => {
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
	self.forceUpdate();

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
export const onInit = self => (dispatch, getState) => {
	Looper.start('WaitPersist', () => {
		const {isLoadPersistStore} = getState().nav;
		if (isLoadPersistStore) {
			Looper.stop('WaitPersist');
			dispatch(loadApp(self));
		}
	});
};

/**
 * Открывает модуль рекламы
 */
export const onOpenOnboarding = () => dispatch => {
	dispatch({type: APP_OPEN_ONBOARDING});
};

/**
 * Открывает модуль эксперементов
 */
export const onOpenPlayground = () => dispatch => {
	dispatch({type: APP_OPEN_PLAYGROUND});
};

/**
 *   Открывает модуль индикаторов
 */
export const onOpenIndicators = () => dispatch => {
	dispatch({type: APP_OPEN_INDICATORS});
};
