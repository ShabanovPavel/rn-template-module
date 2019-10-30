import {APP_UPDATE_NET_CONNECT} from '../app';

/**
 * @module Reducers/App
 * @description Стор ответственный за глобальные состояния
 * @export
 * @param {*} [state={
 * 		isOffline: false,
 * 	}]
 * @param {*} [action={}]
 * @returns новое состояние хранилища
 * @private
 */
// eslint-disable-next-line
export function app(
	state = {
		isOffline: false,
	},
	action = {},
) {
	switch (action.type) {
		case APP_UPDATE_NET_CONNECT:
			return {...state, isOffline: action.isConnected};

		default:
			return state;
	}
}
