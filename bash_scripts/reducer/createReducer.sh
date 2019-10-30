#!/bin/bash

#Преобразуем в нижний регистр
NameReducerLower="$(tr '[:upper:]' '[:lower:]'  <<< ${1})" 
#Преобразуем в первый символ в верхний регистр
NameReducer="$(tr '[:lower:]' '[:upper:]' <<< ${NameReducerLower:0:1})${NameReducerLower:1}"


mkdir -p src
mkdir -p src/core
mkdir -p src/core/reducers

cd src/core/reducers

echo "import {} from '../../modules';

/**
 * @module Reducers/${NameReducer}
 * @description ''
 * @export
 * @param {*} [state={}]
 * @param {*} [action={}]
 * @returns новое состояние хранилища
 * @private
 */
// eslint-disable-next-line
export function ${NameReducerLower}(
	state = {
	},
	action = {
    },
) {
	switch (action.type) {
		default:
			return state;
	}
}" > ${NameReducerLower}-reducer.js


# Чистим одинаковые иморты modules
echo "$(sed '/'${NameReducerLower}-reducer'/d'  index.js)" >index.js
# Добавляем модуль 
echo "export * from './${NameReducerLower}-reducer';">>index.js 