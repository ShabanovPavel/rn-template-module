import {push, setRoot} from './core/navigation';
import {} from './modules';
import {APP_INIT} from './core/app';
import {rootMainApp} from './routes';

export default function nav(
	state = {
		isLoadPersistStore: false,
	},
	action = {},
) {
	let nextState;
	switch (action.type) {
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
