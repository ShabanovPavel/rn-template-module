#!/bin/bash

#Преобразуем в нижний регистр
Name="$(tr '[:upper:]' '[:lower:]'  <<< ${1})" 
#Преобразуем в нижний регистр 
NameModule="$(tr '[:upper:]' '[:lower:]'  <<< ${Name})"
#Преобразуем в первый символ в верхний регистр
NameTextModule="$(tr '[:lower:]' '[:upper:]' <<< ${Name:0:1})${Name:1}"
#Преобразуем весь такс в верхний регистр
NameAction="$(tr '[:lower:]' '[:upper:]' <<< ${Name})"



cd src


echo "$(sed '/'${NameModule}'/d'  index.js)">index.js
echo "$(sed '/'{${NameTextModule}Screen}'/d'  index.js)" >index.js
echo "$(sed "s/${NameTextModule}Screen\\,//" index.js)">index.js
echo "$(sed "s/${NameTextModule}Screen//" index.js)">index.js
#Коментит все вызовы с участием модуля в главном редьюсере навигации приложения
echo "$(sed  "/'${Name}'/ s/^\\/\\///" reducer.js)" >reducer.js &&
echo "$(sed  "/'${Name}'/ s/^/\\/\\//" reducer.js)" >reducer.js


cd modules
echo "$(sed '/'${NameModule}'/d'  index.js)" >index.js
