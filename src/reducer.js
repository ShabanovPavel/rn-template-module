import {push, popTo} from './core/navigation';
import {PLAYGROUND_OPEN_ONBOARDING, ONBOARDING_BACK_2} from './modules';
import {APP_OPEN_PLAYGROUND, APP_OPEN_ONBOARDING, APP_OPEN_INDICATORS} from './core/app';

export default function nav(
	state = {
		isLoadPersistStore: false,
	},
	action = {},
) {
	let nextState;
	switch (action.type) {
		// Indicators
		case APP_OPEN_INDICATORS:
			push('initApp', 'indicators');
			break;

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
		case ONBOARDING_BACK_2:
			popTo(2);
			break;

		case 'persist/REHYDRATE':
			return {...state, isLoadPersistStore: true};
		default:
			nextState = state;
			break;
	}
	return nextState || state;
}
