import {MAIN_OPEN_ONBOARDING, MAIN_OPEN_PLAYGROUND, MAIN_OPEN_INDICATORS} from './action';

/**
 * @module Main/Methods
 * @description логика модуля
 * @private
 * */

const self = {};

/**
 * Открывает модуль рекламы
 */
self.onOpenOnboarding = () => dispatch => {
	dispatch({type: MAIN_OPEN_ONBOARDING});
};

/**
 * Открывает модуль эксперементов
 */
self.onOpenPlayground = () => dispatch => {
	dispatch({type: MAIN_OPEN_PLAYGROUND});
};

/**
 *   Открывает модуль индикаторов
 */
self.onOpenIndicators = () => dispatch => {
	dispatch({type: MAIN_OPEN_INDICATORS});
};

export default self;
