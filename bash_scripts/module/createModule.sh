#!/bin/bash

#Преобразуем в нижний регистр
Name="$(tr '[:upper:]' '[:lower:]'  <<< ${1})" 
#Преобразуем в нижний регистр 
NameModule="$(tr '[:upper:]' '[:lower:]'  <<< ${Name})"
#Преобразуем в первый символ в верхний регистр
NameTextModule="$(tr '[:lower:]' '[:upper:]' <<< ${Name:0:1})${Name:1}"
#Преобразуем весь такс в верхний регистр
NameAction="$(tr '[:lower:]' '[:upper:]' <<< ${Name})"

mkdir -p src
mkdir -p src/modules
mkdir -p src/modules/${NameModule}

cd src/modules/${NameModule}
mkdir -p ./components

#############Cоздание Компонента
cd components

echo "import React from 'react';
import {View, BindComponent, Text} from '../../../library';
import Styles from './styles';

type Props = {
	isLoadScreen: Boolean, // загрузился ли экран
	styles: Object, // стили для экрана
	compose: Function, // объединить стили
	setPropsWix: Function, // записывает какую либо информацию между экранами
	getPropsWix: Function, // возвращает пропсу между экранами
	onUpdateTheme: Function, // меняет тему приложения
	onBack: Function, // вызывает шаг назад по навигации
	onPushNavigation: Function, // вызывает пуш в стек по навигации приложения
	onRegisterFocusScreen: Function, // регистрирует слушателя на фокусировку экрана
	onClick: Function,
};

class Screen extends React.PureComponent<Props> {
	constructor(props) {
		super(props);
		const {onRegisterFocusScreen} = props;
		onRegisterFocusScreen(isFocus => {
			if (isFocus) {
				/** Компонет начал отображаться на экране */
			} else {
				/** Компонент прекратил отображение на экране */
			}
		});
	}

	render() {
		const {
			props, // пропса компонента
		} = this;
		const {
			onClick,
			styles,
			compose,
			setPropsWix,
			getPropsWix,
			onUpdateTheme,
			onBack,
			onPushNavigation,
			isLoadScreen,
		} = props;

		return (
			<View safeArea style={styles.mainContainer}>
				<Text
					onPress={onClick}
					style={compose(
						styles.textScreen,
						{fontSize: 45},
					)}>
					${NameTextModule}Screen
				</Text>
			</View>
		);
	}
}

export default BindComponent(Screen, {style: Styles, statusBar: 'dark-tr'});">index.js

echo "import {StyleSheet} from 'react-native';

export default theme =>
	StyleSheet.create({
		mainContainer: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.color.GRAY_BORDER,
		},
		textScreen: {
			fontSize: 15,
			color: theme.color.BLACK,
		},
	});">styles.js

cd ..

#############Создание Контейнера
echo "import methods from './methods';
import component from './components';
import registerConnect from '../../core/containers';
import {} from '../../core/selectors';

export default registerConnect(state => ({}), methods)(component);"> connect.js



#############Создание Действий
echo "/**
 * @module ${NameTextModule}/Actions
 * @description Типы событий этого модуля. Каждое событие с *SEND* имеет два типа событий состояния оканчивающихся на SUCCESS и FAILD
 * @private
 */

/** Тестовый экшин, нажатие на кнопку */
export const ${NameAction}_CLICK = '${NameTextModule}/${NameAction}_CLICK';"> actions.js

#############Создание Методов Модуля
echo "import {} from '../../library';
import {${NameAction}_CLICK} from './actions';
import {Request} from '../../core/rest';

/**
 * @module ${NameTextModule}/Methods
 * @description логика модуля
 * @private
 */
const ${NameModule} = {};

/** Тестовый метод который печатает в консоль */
${NameModule}.onClick = params => async (dispatch, getState) => {
	dispatch({type: ${NameAction}_CLICK, payload: {...params}});
};

export default ${NameModule};"> methods.js


#############Создание фасада модуля
echo "/**
 * @module ${NameTextModule}
 * @description Модуль главной рабочей области
 * */
import Screen from './connect';

export * from './actions';
export {Screen as ${NameTextModule}Screen};
"> index.js

cd ..

#############Подключаем к проекту


# Чистим одинаковые иморты modules
echo "$(sed '/'${NameModule}'/d'  index.js)" >index.js
# Добавляем модуль 
echo "export * from './${NameModule}';">>index.js 
cd ..


# Регистрация модуля в index.js в навигации
echo "$(sed '/'${NameModule}'/d'  index.js)">index.js &&
echo "$(sed '/'${NameTextModule}Screen'/d'  index.js)" >index.js &&
echo "$(sed "s/. ${NameTextModule}Screen//" index.js)">index.js &&
echo "$(sed "s/.${NameTextModule}Screen//" index.js)">index.js &&
echo "$(sed "s/\\,\\,/\\,/" index.js)">index.js 

echo "$(< index.js sed "/initModules() {/a \\
registerComponent('${NameModule}', ${NameTextModule}Screen);
")" > index.js

echo "$(sed "s/\\} from \\'\\.\\/modules\\'\\;/\\, ${NameTextModule}Screen\\} from \\'\\.\\/modules\\'\\;/" index.js)">index.js 
echo "$(sed "s/^\\, ${NameTextModule}Screen/${NameTextModule}Screen/" index.js)">index.js 



#Проверяем был ли он подключен арньше и если был то раскоменим связи
echo "$(sed  "/'${Name}'/ s/\\/\\///" reducer.js)" >reducer.js


