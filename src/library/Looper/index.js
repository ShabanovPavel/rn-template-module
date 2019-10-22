let instance;

/**
 * @class Looper
 * @classdesc Выполняет действия с заданной переодичностью (в основном для зацикливания запросов)
 */
export default class Looper {
	/**
	 * Инициализация
	 * @static
	 * @returns экземпляр этого класса
	 * @memberof Looper
	 */
	static instance() {
		if (!instance) {
			instance = new Looper();
		}
		return instance;
	}

	constructor() {
		this.buff = {}; // буфер задач
		this.run(); // запускается жизненный цикл
	}

	run() {
		setInterval(() => {
			Object.values(this.buff).forEach(el => {
				if (el.wait > 0) {
					el.wait -= 1;
				} else {
					el.action();
					el.wait = el.interval;
				}
			});
		}, 1000);
	}

	/**
	 * Стартует какое либо событие на повтор
	 * @param {String} name имя собятия
	 * @param {Function} action действие собятия
	 * @param {Number} interval интервал между повторами в сек
	 */
	start(name, action, interval = 1) {
		if (!this.buff[name]) {
			this.buff[name] = {
				action,
				interval,
				wait: interval,
			};
		}
	}

	/**
	 * Снимает с выполнения какое либо событие
	 * @param {String} name имя собятия
	 */
	stop(name) {
		delete this.buff[name];
	}
}
const LooperRN = Looper.instance();
export {LooperRN as Looper};
