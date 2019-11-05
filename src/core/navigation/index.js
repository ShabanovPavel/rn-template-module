/** @module Navigation */
import {Navigation} from 'react-native-navigation';
import {Log} from '../../library/Log';

let targetScreen; // id текущего экрана
let lastScreen; // id экрана который был
let provider; // обертка редакса
let screenEventListenerDidAppear;
let screenEventListenerDidDisappear;
const isWait = false; // для игнорирования сторонних операций во время совершения операции

// const lastNameScreen = '';
// const stack = []; // для стэк навигации (орентировочный маршрут)
// let isSwipebl = true;
// const timeWait = 1000; // ms

/**
 * Переход назад по стек навигаци
 * @param {String} currentID имя компонента с которого производится переход
 * @param {Object} options настройки перехода см(док wix/react-native-navigation)
 */
const pop = (currentID, options = {}) => {
	Navigation.pop(currentID, options);
};

/**
 * Переход вперед по стек навигации
 * @param {String} currentID имя компонента с которого делается переход
 * @param {String} nameScreen имя компонента на который делается переход
 * @param {Object} options настройки перехода см(док wix/react-native-navigation)
 * @param {Object} passProps пропса для передачи между экранами через натив
 */
const push = (currentID, nameScreen, options = {}, passProps = {}) => {
	if (targetScreen !== nameScreen) {
		Navigation.push(currentID, {
			component: {
				id: nameScreen,
				name: nameScreen,
				passProps,
				options,
			},
		});
	}
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
 * Устанавливает провайдер для компонентов
 * @param {Object} component обертка редакса
 */
const setProvider = component => {
	provider = component || (componentScreen => componentScreen);
};

/**
 * Трансформирует экран
 * @param {*} screenID
 * @param {*} options настройки экрана
 */
const mergeOptions = (screenID, options) => {
	Navigation.mergeOptions(screenID, options);
};

/**
 * Расширяет компонент виксовскими штуками
 * @param {Object} self контекст
 */
const bindComponent = self => {
	Navigation.events().bindComponent(self);
};

/**
 * Регистрация компонентов
 * @param {String} name имя компонента
 * @param {Object} component компонент
 */
function registerComponent(name, component) {
	Navigation.registerComponent(name, () => provider(component), () => component);
}

/**
 * Отслеживает последовательность открытия экранов пользователем
 * @param {String} root имя корня навигации
 * @param {Object} service сервисы для регистрации и отправки какой0либо информации
 */
const traking = (root, service) => {
	screenEventListenerDidAppear = Navigation.events().registerComponentDidAppearListener(
		({componentId, componentName}) => {
			targetScreen = componentId;
		},
	);
	screenEventListenerDidDisappear = Navigation.events().registerComponentDidDisappearListener(
		({componentId, componentName}) => {},
	);
};

const deleteTraking = () => {
	screenEventListenerDidAppear.remove();
	screenEventListenerDidDisappear.remove();
};

/**
 * Показывает компонент как наложение
 * @param {String} name имя/ид  компонента
 * @param {Object} options  параметры
 */
const showOverlay = (name, options) => {
	Navigation.showOverlay({
		component: {
			id: name,
			name,
			options,
		},
	});
};

/**
 * Скрывает все наложения на экране по имени/id
 * @param {String} name имя/ид  компонента
 */
const dismissOverlay = name => {
	Navigation.dismissOverlay(name);
};

/**
 * Обернуть метод в функцию генератор собятия
 * @param {Function} action функция которую необходимо обернуть
 */
const storeDispatch = action => store.dispatch(action);

export {
	Navigation,
	registerComponent,
	pop,
	push,
	setRoot,
	bindComponent,
	navigateTab,
	mergeOptions,
	traking,
	deleteTraking,
	showOverlay,
	dismissOverlay,
	storeDispatch,
	setProvider,
};
