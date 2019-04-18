import {push, pop} from './core/navigation';
import {ONBOARDING_CLOSE, PLAYGROUND_CLOSE, PLAYGROUND_OPEN_ONBOARDING} from './modules';
import {APP_OPEN_PLAYGROUND, APP_OPEN_ONBOARDING, APP_INIT} from './core/app';

export default function nav(state = {}, action = {}) {
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
