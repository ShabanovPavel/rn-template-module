import {Links} from '../../library';
import {} from './action';

export default () => (dispatch, getState) => {
	Links.setHandlerDeepLink('openMain', () => {
		// логика навигации вызов экшинов
	});
	Links.onDeepStart();
};
