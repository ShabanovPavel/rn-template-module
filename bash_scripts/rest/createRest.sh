#!/bin/bash

#Преобразуем в нижний регистр
NameRestLower="$(tr '[:upper:]' '[:lower:]'  <<< ${1})" 
#Преобразуем в первый символ в верхний регистр
NameRest="$(tr '[:lower:]' '[:upper:]' <<< ${NameRestLower:0:1})${NameRestLower:1}"


mkdir -p src
mkdir -p src/core
mkdir -p src/core/rest
mkdir -p src/core/rest/requests

cd src/core/rest/requests

echo "import Fetch from '../fetch';

export const requestTest${NameRestLower} = async params => {
	console.log('request.${NameRestLower}.requestTest${NameRestLower}: ', params);

	// request

	return {ok: true};
};" > ${NameRestLower}.js


# Чистим одинаковые иморты modules
echo "$(sed '/'${NameRestLower}'/d'  index.js)" >index.js
# Добавляем модуль 
echo "export * from './${NameRestLower}';">>index.js 