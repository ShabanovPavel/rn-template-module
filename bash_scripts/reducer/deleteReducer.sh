#!/bin/bash

#Преобразуем в нижний регистр
NameReducerLower="$(tr '[:upper:]' '[:lower:]'  <<< ${1})" 
#Преобразуем в первый символ в верхний регистр
NameReducer="$(tr '[:lower:]' '[:upper:]' <<< ${NameReducerLower:0:1})${NameReducerLower:1}"

mkdir -p src
mkdir -p src/core
mkdir -p src/core/reducers

cd src/core/reducers

rm -rf ${NameReducerLower}-reducer.js

# Чистим одинаковые иморты modules
echo "$(sed '/'${NameReducerLower}-reducer'/d'  index.js)" >index.js