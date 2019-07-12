/** @module Utils */
import moment from 'moment';
import 'moment/locale/ru';
import {I} from '../I18n';

moment.locale('ru');

/**
 * Сон в асинхронной функции
 * @param {Number} ms количество милисекунд
 * @memberof module:Utils
 */
const sleep = ms => new Promise(r => setTimeout(r, ms));

/**
 * Преобразует объект в хэш
 * @param {Object} object
 * @memberof module:Utils
 */
const objectToHash = object => {
	const hash = {};
	Object.keys(object).forEach(key => {
		hash[key] = JSON.stringify(object[key]);
	});
	return hash;
};

/**
 * Преобразует массив в объект
 * @param {Array} array массив объектов
 * @param {String} key поле по которому присваимват ь ключи
 * @param {*} initial
 * @memberof module:Utils
 */
const arrayToMap = (array, key, initial = {}) => {
	return array.reduce((prev, item) => {
		const o = prev;
		const i = item[key];
		o[i] = item;
		return o;
	}, initial);
};

/**
 * Преобразует объект в массив
 * @param {Object} object
 * @memberof module:Utils
 */
const objectToArray = object => Object.keys(object || {}).map(key => ({...object[key], id: key}));

/**
 * Фрматирует число  расставляя пробелы
 * @param {String} str входное число
 * @memberof module:Utils
 */
const formatNumer = str => str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

/**
 * Округление числа до заданной точности и форматируем число, добавляем пробелы между разрядами
 * @param {String|Number} numb число которое необходимо отформатировать
 * @param {String|Number} eps точнось
 * @returns {String} отформатированное число
 * @memberof module:Utils
 */
const rounding = (numb, eps = 1) => {
	if (numb !== undefined) {
		let n = '';
		if (typeof numb === 'number') {
			n = numb;
		} else {
			n = +numb.split(' ').join('');
		}
		let e;
		if (typeof eps === 'number') {
			e = eps;
		} else {
			e = +eps.split(' ').join('');
		}
		const res = Math.round(n / e, 0) * e;
		const epL = e.toString().length;
		const needL = e < 1 ? epL - 2 : 0;
		const r = (needL > 0 ? res.toFixed(needL) : res.toFixed()).split('.');
		return `${formatNumer(r[0])}${r[1] ? `.${r[1]}` : ''}`;
	}
	return '0';
};

/**
 * Вычисление ближайшей цели
 * @param {Number} money текущее число
 * @memberof module:Utils
 */
const getNextMoney = money => {
	let res = '';
	if (money && typeof money === 'number') {
		const c = Math.round(+money, 0).toString();
		if (+c[0] >= 5) {
			res += '10';
		} else {
			res += '5';
		}
		for (let i = 1; i < c.length; i += 1) res += '0';
	} else {
		res = '0';
	}
	return +res;
};

/**
 * Форматирует дату
 * @param {Date} date дата
 * @param {String} format *необходимый формат
 * @memberof module:Utils
 */
const getDate = (date, format = null) => {
	const dateInput = new Date(date);
	if (format) {
		return moment(dateInput).format(format);
	}

	return moment(dateInput).format('DD MMM YYYY');
};

/**
 * Возвращает состояние входной даты по отношению к текущему времени
 * @param {String} date дата которую необходимо разобрать
 */
const getDateText = date => {
	const dateInput = new Date(date);
	const dateNow = new Date();
	const day = dateInput.getDate();
	const month = dateInput.getMonth();
	const year = dateInput.getFullYear();

	if (dateNow.getFullYear() === year && dateNow.getMonth() === month && dateNow.getDate() === day) {
		return I.text('Сегодня');
	}
	if (
		dateNow.getFullYear() === year &&
		dateNow.getMonth() === month &&
		+dateNow.getDate() - 1 === +day
	) {
		return I.text('Вчера');
	}
	if (
		dateNow.getFullYear() === year &&
		dateNow.getMonth() === month &&
		+dateNow.getDate() - 7 < +day
	) {
		return I.text('На прошлой неделе');
	}
	if (dateNow.getFullYear() === year && dateNow.getMonth() === month) {
		return I.text('В этом месяце');
	}
	if (dateNow.getFullYear() === year && +dateNow.getMonth() - 1 === +month) {
		return I.text('В прошлом месяце');
	}
	if (dateNow.getFullYear() === year) {
		return I.text('В этом году');
	}
	if (+dateNow.getFullYear() - 1 === +year) {
		return I.text('В прошлом году');
	}
	return I.text('Ушел в подполье');
};

/**
 * Вернуть первый ключ в объекте
 * @param {Object} obj из которого надо вернуть
 * @memberof module:Utils
 */
const getFirstKey = obj => {
	const arr = Object.keys(obj);
	if (arr.length > 0) {
		return arr[0];
	}
	return undefined;
};

/**
 * Возвращает ключ в объекте любой вложенности, если ключ не найдет то возврщает undefined
 *
 * @param {Object} object объект для поиска
 * @param {String} key если . есть то ищется путь если их нет то ищется рекурсивно в оюхекто до первого вхождения
 */
const getKeyObject = (object, key) => {
	let search;
	if (typeof object === 'object') {
		if (key.toString().split('.').length > 1) {
			search = object;
			key
				.toString()
				.split('.')
				.forEach(el => {
					if (search[el]) {
						search = search[el];
					} else {
						return undefined;
					}
				});
			return search;
		}
		for (const el in object) {
			if (el === key) {
				return object[el];
			}
			search = getKeyObject(object[el], key);
			if (search) return search;
		}
	}
	return search;
};

export const validateEmail = email => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const Utils = {
	validateEmail,
	arrayToMap,
	objectToHash,
	objectToArray,
	getFirstKey,
	getDate,
	sleep,
	rounding,
	getNextMoney,
	getDateText,
	getKeyObject,
};
