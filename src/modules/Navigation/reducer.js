import { Actions } from 'react-native-router-flux';
import { NAVIGATION_LOGIN, NAVIGATION_PROFILE, LOGIN_SET_NAME } from '../../modules';

export default function nav(state = {}, action) {
	switch (action.type) {
		case NAVIGATION_LOGIN:
			Actions.login();
			break;
		case LOGIN_SET_NAME:
		case NAVIGATION_PROFILE:
			Actions.profile();
			break;
		default:
			break;
	}

	return state;
}
