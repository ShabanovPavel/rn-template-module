import i18n from './i18n';

let isInstance;
/**
 * Выполняет перевод и отслеживание не переведнных данных
 *
 * @class ILocalization
 */
class ILocalization {
	constructor() {
		this.db = {};
	}

	static instanse() {
		if (!isInstance) {
			isInstance = new ILocalization();
		}

		return isInstance;
	}

	_getText(key) {
		const text = i18n.t(key, {language: i18n.currentLocale()});
		if (i18n.t(key, {language: i18n.currentLocale()}).includes('[missing')) {
			this.db[i18n.currentLocale()] = {...this.db[i18n.currentLocale()], [key]: key};
			return key;
		}
		return text;
	}

	text(text = 'default') {
		return this._getText(text);
	}

	printNotFound() {
		console.log('Not found localization', this.db);
	}
}

const localization = ILocalization.instanse();

export {localization as I};
