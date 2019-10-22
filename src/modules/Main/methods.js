import {Log} from '../../library';
import {} from './action';

/**
 * @module Main/Methods
 * @description логика модуля
 * @private
 */
const self = {};

/** Останавливаем отправку команды ping */
self.test = params => async (dispatch, getState) => {
	Log('Click', params);
};

export default self;
