/**
 * @module Rest/Storage
 * @description хранилищи токенов
 * @private
 */
import {AsyncStorage} from 'react-native';

/**
 * Записывает токен
 *
 * @param {String} token токен сессии
 * @param {String} refreshToken токен для рефреша
 * @param {String} time время через которое необходимо обновить
 * @memberof module:Rest/Storage
 */
export const setToken = async (token, refreshToken, time) => {
	try {
		console.log('token', token, 'refreshToken', refreshToken, 'time', time);
		await AsyncStorage.setItem('token', token.toString());
		await AsyncStorage.setItem('timeRefresh', time.toString());
		await AsyncStorage.setItem('refreshToken', refreshToken.toString());
	} catch (error) {
		// Error saving data
		console.log('DO NOT SAVED PRIVATE STORAGE');
	}
};

/**
 *
 * @param {*} key
 * @param {*} value
 * @memberof module:Rest/Storage
 */
export const setItem = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value.toString());
	} catch (error) {
		// Error saving data
		console.log('DO NOT SAVED PRIVATE STORAGE');
	}
};

/**
 *
 * @param {*} key
 * @memberof module:Rest/Storage
 */
export const getItem = async key => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return value;
		}
		return '';
	} catch (error) {
		console.log('DO NOT GIVE DATA IN PRIVATE STORAGE');
		return '';
	}
};

/**
 * Возвращает токен
 * @return {String} token
 * @memberof module:Rest/Storage
 */
export const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem('token');

		if (token !== null) {
			return token;
		}
		return '';
	} catch (error) {
		console.log('DO NOT GIVE DATA IN PRIVATE STORAGE');
		return '';
	}
};
