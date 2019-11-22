import {push, setRoot, showOverlay, dismissOverlay} from './core/navigation';
import {
	MAIN_CLICK,
	SCREEN1_CLICK,
	STORY_CLOSE,
	PLAYGROUND_STORY_OPEN,
	PLAYGROUND_CLICK,
} from './modules';
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
		case PLAYGROUND_CLICK:
			push('playgroundStack', 'screen1');
			break;
		case MAIN_CLICK:
			push('playgroundStack', 'screen1');
			break;
		case SCREEN1_CLICK:
			push('playgroundStack', 'screen2');
			break;
		case APP_INIT:
			setRoot(rootMainApp);
			break;
		case PLAYGROUND_STORY_OPEN:
			showOverlay('story');
			break;
		case STORY_CLOSE:
			dismissOverlay('story');
			break;
		case 'persist/REHYDRATE':
			return {...state, isLoadPersistStore: true};
		default:
			nextState = state;
			break;
	}
	return nextState || state;
}
