import {push, setRoot} from './core/navigation';
import {MAIN_CLICK, SCREEN1_CLICK} from './modules';
import {APP_INIT} from './core/app';
import {rootMainApp} from './routes';
/**
 * @module Reducers/Nav
 * @description Стор ответственный за глобальные состояния навигации приложения
 * @export
 * @param {*} [state={
 * 		isLoadPersistStore: false,
 * 	}]
 * @param {*} [action={}]
 * @returns новое состояние хранилища
 */
export default function nav(
	state = {
		isLoadPersistStore: false,
	},
	action = {},
) {
	let nextState;
	switch (action.type) {
		case MAIN_CLICK:
			push('main', 'screen1');
			break;
		case SCREEN1_CLICK:
			push('screen1', 'screen2');
			break;
		case APP_INIT:
			setRoot(rootMainApp);
			break;

		case 'persist/REHYDRATE':
			return {...state, isLoadPersistStore: true};
		default:
			nextState = state;
			break;
	}
	return nextState || state;
}
