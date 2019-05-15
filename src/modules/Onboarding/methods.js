import {ONBOARDING_BACK_2} from './action';

/**
 * @module Onboarding/Methods
 * @description логика модуля
 * @private
 */

export const onBack2 = () => dispatch => {
	dispatch({type: ONBOARDING_BACK_2});
};
