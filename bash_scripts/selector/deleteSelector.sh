#!/bin/bash

#Преобразуем в нижний регистр
NameSelectorLower="$(tr '[:upper:]' '[:lower:]'  <<< ${1})" 
#Преобразуем в первый символ в верхний регистр
NameSelector="$(tr '[:lower:]' '[:upper:]' <<< ${NameSelectorLower:0:1})${NameSelectorLower:1}"

mkdir -p src
mkdir -p src/core
mkdir -p src/core/selectors

cd src/core/selectors

rm -rf ${NameSelectorLower}-selector.js

# Чистим одинаковые иморты modules
echo "$(sed '/'${NameSelectorLower}-selector'/d'  index.js)" >index.js