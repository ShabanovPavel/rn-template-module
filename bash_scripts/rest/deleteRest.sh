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

rm -rf ${NameRestLower}.js

# Чистим одинаковые иморты modules
echo "$(sed '/'${NameRestLower}'/d'  index.js)" >index.js