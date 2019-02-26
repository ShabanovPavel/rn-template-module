/** @module Navigation */

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from '../../store';

const {store} = configureStore();

let lastNameScreen = '';
/**
 * Переход вперед по стек навигации
 * @param {String} currentID имя компонента с которого делается переход
 * @param {String} nameScreen имя компонента на который делается переход
 * @param {Object} options настройки перехода см(док wix/react-native-navigation)
 */
const push = (currentID, nameScreen, options) => {
	if (lastNameScreen !== nameScreen) {
		lastNameScreen = nameScreen;
		Navigation.push(currentID, {
			component: {
				id: nameScreen,
				name: nameScreen,
			},
			options,
		});
	}
};

/**
 * Переход назад по стек навигаци
 * @param {String} currentID имя компонента с которого производится переход
 */
const pop = currentID => {
	lastNameScreen = '';
	Navigation.pop(currentID);
};

/**
 * Сбрасывание стека навигации до корня
 * @param {String} currentID имя текущей сцена
 */
const popToRoot = currentID => {
	lastNameScreen = '';
	Navigation.popToRoot(currentID);
};

/**
 *  Переход по таб навигации wix
 *
 * @param {String} screenID имя таб навигатора или имя сцены в табнавигаторе с которой производится переход
 * @param {String} nameScreen имя сцены на которую производится переход
 * @param {Object} options почие настройки (см wix/react-native-navigation)
 */
const navigateTab = (screenID, nameScreen, options) => {
	Navigation.mergeOptions(screenID, {
		bottomTabs: {
			currentTabId: nameScreen,
			...options,
		},
	});
};

/**
 * Замена дерева навигации
 * @param {Object} root дерево навигации (RNN)
 */
const setRoot = root => {
	Navigation.setRoot(root);
};

/**
 * Трансформирует экран
 * @param {*} screenID
 * @param {*} options
 */
const mergeOptions = (screenID, options) => {
	Navigation.mergeOptions(screenID, options);
};

const setLastNameScreen = nameScreen => {
	lastNameScreen = nameScreen;
};

const bindComponent = self => {
	Navigation.events().bindComponent(self);
};

/**
 * Регистрация компонентов
 * @param {String} name имя компонента
 * @param {Object} component компонент
 */
function registerComponent(name, component) {
	Navigation.registerComponentWithRedux(name, () => component, Provider, store);
}

/**
 * Отслеживает последовательность открытия экранов пользователем
 * @param {Object} service сервисы для регистрации и отправки какой0либо информации
 */
const traking = service => {
	const {analytic} = service;
	Navigation.events().registerComponentDidAppearListener(({componentId, componentName}) => {
		analytic.pushScreen(componentName);
	});
};

export {
	registerComponent,
	pop,
	push,
	setRoot,
	bindComponent,
	navigateTab,
	lastNameScreen,
	popToRoot,
	mergeOptions,
	setLastNameScreen,
	traking,
};
