import {} from '../../library';
import {SCREEN1_CLICK} from './actions';

/**
 * @module Screen1/Methods
 * @description логика модуля
 * @private
 */
const screen1 = {};

/** Тестовый метод который печатает в консоль */
screen1.onClick = params => async (dispatch, getState) => {
	dispatch({type: SCREEN1_CLICK, payload: {...params}});
};

export default screen1;
