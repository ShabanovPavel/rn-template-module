/**
 * @module Playground/Methods
 * @description логика модуля
 * @private
 * */
import {PLAYGROUND_CLOSE, PLAYGROUND_OPEN_ONBOARDING} from './action';

/**
 *  Зыкрывает модуль эксперементов
 */
export const onOpenOnboarding = () => dispatch => {
	dispatch({type: PLAYGROUND_OPEN_ONBOARDING});
};
