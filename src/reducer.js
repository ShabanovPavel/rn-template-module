import {push} from './core/navigation';
import {PLAYGROUND_OPEN_ONBOARDING} from './modules';
import {APP_OPEN_PLAYGROUND, APP_OPEN_ONBOARDING} from './core/app';

export default function nav(
	state = {
		isLoadPersistStore: false,
	},
	action = {},
) {
	let nextState;
	switch (action.type) {
		//  Playground
		case APP_OPEN_PLAYGROUND:
			push('initApp', 'playground');
			break;
		case PLAYGROUND_OPEN_ONBOARDING:
			push('initApp', 'onboarding');
			break;

		// Onboarding
		case APP_OPEN_ONBOARDING:
			push('initApp', 'onboarding');
			break;

		case 'persist/REHYDRATE':
			return {...state, isLoadPersistStore: true};
		default:
			nextState = state;
			break;
	}
	return nextState || state;
}
