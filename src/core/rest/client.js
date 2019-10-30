import NetInfo from '@react-native-community/netinfo';
import * as Requests from './requests';
import {getItem, setItem} from './storadge';
import {Toast, Log, I} from '../../library';
import Options from '../../config';

let instance;

const TIME_REFRESH = 5000; // дефолтное время обновления токена

/**
 * Токены для запросов
 * @memberof class:RequestsManager
 */
const getTokens = async () => ({
	token: await getItem('token'),
	token_type: await getItem('token_type'),
});

/** Стераем токены */
const logout = async () => {
	await setItem('token_info', {});
	await setItem('token', '');
	await setItem('token_type', '');
	await setItem('token_time', '');
};

let isConnected = true; // соединение есть или нет
let typeConected;

/**
 * @class RequestsManager
 * @classdesc Выполняет запросы к серверу
 * @private
 */
class RequestsManager {
	/**
	 * Инициализация
	 * @static
	 * @returns экземпляр этого класса
	 * @memberof RequestsManager
	 */
	static instance() {
		if (!instance) {
			instance = new RequestsManager();
		}
		return instance;
	}

	constructor() {
		this.callbackChangeConnectedNet = () => {};
		this.bufferRequest = []; // очередь запросов
		this.bufferResponse = []; // запросы ожидающие ответа

		this.isWait = false; // Флаг остановки очереди (В основном для рефреша токена)
		this.idInterval;
		this.methodList = [
			// лист методов которые не должны дублироваться (получение нескольких таких собщений приведет к ожидания первого поступившего)
			'login',
			'changedOrders',
		];

		this.currentNextId = 0;

		this.startRequests(); // Запуск первого запроса
	}

	/**
	 * Генерирует идентификатор для запроса
	 * @returns идентификатор в очереди запросов
	 * @memberof RequestsManager
	 */
	generationId() {
		this.currentNextId += 1;
		if (+this.currentNextId > 9 * 1000) this.currentNextId = 1;
		return this.currentNextId;
	}

	waitResonse() {
		this.idInterval = setInterval(() => {
			NetInfo.fetch().then(state => {
				const isNet = state.isConnected;
				typeConected = state.type;
				if (isConnected !== isNet) {
					isConnected = isNet;
					this.callbackChangeConnectedNet(isNet);
				}
			});
			if (isConnected && this.bufferResponse.length < 1 && this.bufferRequest.length > 0) {
				clearInterval(this.idInterval);
				this.startRequests();
			} else {
				this.bufferRequest.forEach(item => {
					// Время ожидания начала запроса
					if (item.timeWait <= item.timeWaitWork) {
						this.stopRequest(item);
					}
					if (!item.isWorkRequest) item.timeWaitWork += 1;
				});
				this.bufferResponse.forEach(item => {
					// // Время ожидания ответа
					if (item.timeWait <= item.timeWork + item.timeWaitWork) {
						this.stopResponse(item);
					}
					if (item.isWorkRequest) item.timeWork += 1;
				});
			}
		}, 1000);
	}

	/**
	 * Выполнение первогов в очереди запроса
	 * @memberof RequestsManager
	 */
	startRequests = async () => {
		if (this.bufferResponse.length < 1) {
			const targetRequest = this.bufferRequest.shift();

			const state = await NetInfo.fetch();
			const isNet = state.isConnected;
			typeConected = state.type;
			if (isConnected !== isNet) {
				isConnected = isNet;
				this.callbackChangeConnectedNet(isNet);
			}

			if (isConnected && targetRequest) {
				const {
					// id,
					// name,
					// isWorkRequest,
					// timeWaitWork,
					// timeWork,
					// timeWait,
					params,
					method,
					callback,
				} = targetRequest;

				this.bufferResponse.push(targetRequest);
				const res = await method({...params, ...(await getTokens())});
				this.deleteResponse(targetRequest.id);

				callback(res);

				this.startRequests();
			} else {
				if (!isConnected) this.bufferRequest.unshift(targetRequest);
				this.waitResonse();
			}
		} else {
			this.waitResonse();
		}
	};

	/**
	 * Фильтрует поступающие запросы по настройками (повторение)
	 * @param {String} nameMethod  имя запроса
	 * @returns разрешен ли запрос или нет
	 * @memberof RequestsManager
	 */
	filterRequest(nameMethod) {
		if (this.methodList.includes(nameMethod)) {
			return !Object.values(this.bufferRequest).some(item => item.name === nameMethod);
		}
		return true;
	}

	/**
	 * Регистрирует запрос
	 *
	 * @param {Number} timeWait время ожидания ответа от сервера
	 * @param {Function} method инкапсулированный запрос
	 * @param {String} name имя запроса
	 * @param {Object} [params={}] данные в запрос
	 * @param {Function} callBack функция обратного вызова для выполнения логики над результатом запроса
	 * @memberof RequestsManager
	 */
	addRequest(timeWait, method, name, params, callback) {
		if (this.filterRequest(name)) {
			const callBack = callback;
			const id = this.generationId();
			this.bufferRequest.push({
				id,
				name, // Имя запроcа
				isWorkRequest: false,
				timeWaitWork: 0, // время ожидания в очереди
				timeWork: 0, // текущее время ожидания ответа
				timeWait, // заданное время ожидания ответа, после которого запрос больше не ожидается и возвращается стандартный ответ
				params,
				method, // Запрос
				callback: callBack,
			});
		}
	}

	/**
	 * Выгружает запрос из очереди ожидания.
	 *
	 * @param {Number} id идентификатор запроса
	 * @memberof RequestsManager
	 */
	deleteResponse(id) {
		this.bufferResponse = this.bufferResponse.filter(el => id !== el.id);
	}

	/**
	 * Удаляет запрос из очереди запроса
	 * @param {Object} item запрос
	 */
	stopRequest(item) {
		this.bufferRequest = this.bufferRequest.filter(el => el.id !== item.id);
		item.callback({
			ok: false,
			error: I.text('Timeout wait error'),
			result: I.text('Проверьте соединения с сетью'),
		});
	}

	/**
	 * Удаляет запрос из очереди  ожидания ответа
	 * @param {Object} item запрос
	 */
	stopResponse(item) {
		this.bufferResponse = this.bufferResponse.filter(el => el.id !== item.id);
		item.callback({
			ok: false,
			error: I.text('Timeout wait error'),
			result: I.text('Время ожидания ответа истекло'),
		});
	}

	/**
	 * Обновляет токен сессии
	 */
	async refreshToken(isDouble = false) {
		const time = await getItem('token_time');
		if ((isDouble || !this.isWait) && time !== '' && +time < Date.now()) {
			this.isWait = true;
			Log('Refresh');
			Requests.refreshToken({...(await getItem('token_info'))}, params => {
				Log('Refresh_params', params);
				if (params.ok) {
					setTimeout(() => {
						this.isWait = false;
					}, 1000);
				} else {
					setTimeout(() => this.refreshToken(true), TIME_REFRESH);
					Toast.show('Не удалось обновить сессию');
				}
			});
		}
	}

	/** Устанавливает обратную связь на изменение состояния соединение */
	listenerNetConnected(online, offline) {
		this.callbackChangeConnectedNet = isConnect => {
			if (isConnect) {
				online();
			} else {
				offline();
			}
		};
	}

	logoutClient() {
		logout();
	}
}

const manager = RequestsManager.instance();

export {manager};
/** Основной мето регистрации запроса */
export default async (method, params, success, error, time) => {
	if (Requests[method]) {
		await manager.refreshToken();

		Log(`request.${method}.params: `, params);

		manager.addRequest(time || Options.timeRequest, Requests[method], method, params, res => {
			// Настраивается в зависимости от клиента и типа сообщений
			Log(`response.${method}: `, res);
			if (res.ok) {
				success && success(res.result);
			} else {
				Options.boolean.isLog && Toast.show(res.result);
				error && error(res.result);
			}
		});
	} else {
		Log(`ERROR: REQUEST ${method} NOT FOUND !!!`);
	}
};
