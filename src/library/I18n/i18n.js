import i18n from 'i18n-js';
import * as RNLanguages from 'react-native-localize';

import en from './translations/en.json';
import ru from './translations/ru.json';

const locales = RNLanguages.getLocales();
if (Array.isArray(locales)) {
	i18n.locale = locales[0].languageTag;
}

i18n.fallbacks = true;
i18n.translations = {en, ru};

export default i18n;
