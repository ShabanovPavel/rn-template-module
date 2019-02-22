import React from 'react';
import {Text} from 'react-native';
import i18n from './i18n';

const getText = key => {
	const text = i18n.t(key, {language: i18n.currentLocale()});
	return i18n.t(key, {language: i18n.currentLocale()}).includes('[missing') ? key : text;
};
const I = ({style = {}, text = 'default'}) => <Text style={style}>{getText(text)}</Text>;

I.text = (text = 'default') => getText(text);

export {I};
