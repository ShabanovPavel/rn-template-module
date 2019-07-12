/**
 * @module Rest/Storage
 * @description хранилищи токенов
 * @private
 */
import * as Keychain from 'react-native-keychain';

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
		await Keychain.setGenericPassword('token', token.toString(), {
			service: 'token',
			accessible: Keychain.ACCESSIBLE.ALWAYS,
		});
		await Keychain.setGenericPassword('timeRefresh', time.toString(), {
			service: 'timeRefresh',
			accessible: Keychain.ACCESSIBLE.ALWAYS,
		});
		await Keychain.setGenericPassword('refreshToken', refreshToken.toString(), {
			service: 'refreshToken',
			accessible: Keychain.ACCESSIBLE.ALWAYS,
		});
	} catch (error) {
		// Error saving data
		console.log('DO NOT SAVED PRIVATE STORAGE');
	}
};

/**
 * Созраняет информацию
 * @param {String} key ключ
 * @param {*} value значение
 * @memberof module:Rest/Storage
 */
export const setItem = async (key, value) => {
	try {
		await Keychain.setGenericPassword(key, JSON.stringify(value), {
			service: key,
			accessible: Keychain.ACCESSIBLE.ALWAYS,
		});
	} catch (error) {
		// Error saving data
		console.log('DO NOT SAVED PRIVATE STORAGE');
	}
};

/**
 * Вытаскивает информацию из хранилища
 * @param {String} key ключ
 * @memberof module:Rest/Storage
 */
export const getItem = async key => {
	try {
		const value = await Keychain.getGenericPassword({service: key});
		if (value !== null) {
			return JSON.parse(value.password);
		}
		return '';
	} catch (error) {
		console.log('DO NOT GIVE DATA IN PRIVATE STORAGE');
		return '';
	}
};
