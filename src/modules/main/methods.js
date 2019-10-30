import {} from '../../library';
import {MAIN_CLICK} from './actions';

/**
 * @module Main/Methods
 * @description логика модуля
 * @private
 */
const main = {};

/** Тестовый метод который печатает в консоль */
main.onClick = params => async (dispatch, getState) => {
	dispatch({type: MAIN_CLICK, payload: {...params}});
};

export default main;
