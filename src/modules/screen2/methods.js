import {} from '../../library';
import {SCREEN2_CLICK} from './actions';

/**
 * @module Screen2/Methods
 * @description логика модуля
 * @private
 */
const screen2 = {};

/** Тестовый метод который печатает в консоль */
screen2.onClick = params => async (dispatch, getState) => {
	dispatch({type: SCREEN2_CLICK, payload: {...params}});
};

export default screen2;
