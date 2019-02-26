import {push, pop} from './core/navigation';
import {
	APP_INIT,
	APP_OPEN_ONBOARDING,
	ONBOARDING_CLOSE,
	APP_OPEN_PLAYGROUND,
	PLAYGROUND_CLOSE,
} from './modules';

export default function nav(state = {}, action = {}) {
	let nextState;
	switch (action.type) {
		//  Playground
		case APP_OPEN_PLAYGROUND:
			push('initApp', 'playground');
			break;
		case PLAYGROUND_CLOSE:
			pop('playground');
			break;

		// Onboarding
		case APP_OPEN_ONBOARDING:
			push('initApp', 'onboarding');
			break;
		case ONBOARDING_CLOSE:
			pop('onboarding');
			break;

		// App
		case APP_INIT:
			// TODO - launch default app
			break;
		default:
			nextState = state;
			break;
	}
	return nextState || state;
}
