#!/bin/bash

#Преобразуем в нижний регистр
NameSelectorLower="$(tr '[:upper:]' '[:lower:]'  <<< ${1})" 
#Преобразуем в первый символ в верхний регистр
NameSelector="$(tr '[:lower:]' '[:upper:]' <<< ${NameSelectorLower:0:1})${NameSelectorLower:1}"


mkdir -p src
mkdir -p src/core
mkdir -p src/core/selectors

cd src/core/selectors

echo "import {createSelector} from 'reselect';

export const slTest = createSelector(
	state => state.app.isOffline,
	status => {
		console.log(status);
		return status;
	},
);" > ${NameSelectorLower}-selector.js


# Чистим одинаковые иморты modules
echo "$(sed '/'${NameSelectorLower}-selector'/d'  index.js)" >index.js
# Добавляем модуль 
echo "export * from './${NameSelectorLower}-selector';">>index.js 