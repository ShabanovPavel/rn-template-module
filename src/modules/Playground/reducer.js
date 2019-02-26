/** @module Playground/Reducer  */
import {PLAYGROUND_CLOSE} from './action';

function reducer(state = {}, action = {}) {
	switch (action.type) {
		default:
			return state;
	}
}
/**
 *  Зыкрывает модуль эксперементов
 */
reducer.close = () => dispatch => {
	dispatch({type: PLAYGROUND_CLOSE});
};

export default reducer;
