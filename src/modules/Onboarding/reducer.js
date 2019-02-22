/** @module Onboarding/Reducer  */
import {ONBOARDING_CLOSE} from './action';

function reducer(state = {}, action = {}) {
	switch (action.type) {
		default:
			return state;
	}
}
/**
 *  Зыкрывает модуль рекламы
 */
reducer.close = () => dispatch => {
	dispatch({type: ONBOARDING_CLOSE});
};

export default reducer;
