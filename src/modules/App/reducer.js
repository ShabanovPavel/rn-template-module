/** @module App/Reducer  */
import {APP_INIT, APP_OPEN_ONBOARDING, APP_OPEN_PLAYGROUND} from './action';
import {Rest} from '../../core/rest';

function reducer(state = {}, action = {}) {
	switch (action.type) {
		default:
			return state;
	}
}
/**
 *  Выполняет проверку состояний на запускаемый сценарий приложения
 */
reducer.init = () => dispatch => {
	dispatch({type: APP_INIT});

	Rest(
		'login',
		{},
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
reducer.openOnboarding = () => dispatch => {
	dispatch({type: APP_OPEN_ONBOARDING});
};
/**
 * Открывает модуль эксперементовы
 */
reducer.openPlayground = () => dispatch => {
	dispatch({type: APP_OPEN_PLAYGROUND});
};

export default reducer;
