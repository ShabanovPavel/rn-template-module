import React from 'react';
import {pop, bindComponent, mergeOptions} from '../../core/navigation';
import {Text, View} from '../UI';
import {BackHandler} from '../BackHandler';
import {StatusBar} from '../StatusBar';
import {Theme} from '../Theme';

const rend = () => null;

let propsWix = {};
/**
 * @param {Object} self компонент подписи
 * @param {Object} options параметры компонента
 * @param {Boolean} options.isBack флаг который указывает возможно ли осуществление обработки кнопки бек
 * @param {String} options.statusBar ('light','dark','hide') указывает использовать светлый статус бар или же оставить темный статус бар  или вообще срыть
 * @param {Function} options.onFocusedScreen функция обработки фокусировки на экран (возвращает true or false в зависимости от фокусировки)
 * @param {Object} options.propsScreen  пропса которую необходимо прокинуть в открывающийся экран (по умолчанию прокидывается все пропса)
 * @param {Function} options.styles функция возвращаюзаяя стиль компонента
 */
export default (self, {isBack = true, statusBar, onFocusedScreen, propsScreen, styles}) => {
	bindComponent(self);
	const nameScreen = self.props.componentId;

	const handleBackPress = () => {
		if (isBack) {
			pop(nameScreen);
			return true;
		}
		return true;
	};

	const setStatusBar = () => {
		if (!statusBar) {
			statusBar = propsWix.statusBar;
		}
		switch (statusBar) {
			case 'light':
				StatusBar.setLigthTranslucent();
				break;
			case 'dark':
				StatusBar.setDarkTranslucent();
				break;
			case 'hide':
				StatusBar.hide();
				break;
			default:
				StatusBar.setDarkTranslucent();
				break;
		}
	};

	const iosSwipeBack = () => {
		mergeOptions(nameScreen, {
			popGesture: isBack,
		});
	};

	self.onBack = function() {
		pop(nameScreen);
	};

	self.updateTheme = theme => {
		Theme.setTheme(theme);
		self.forceUpdate();
		self.styles = styles ? Theme.createStyles(styles) : {};
	};

	self.componentDidAppear = () => {
		setStatusBar();
		iosSwipeBack();
		self.__proto__.componentDidAppear && self.__proto__.componentDidAppear.bind(self)();

		// Логика при установки фокуса на экрана

		// console.log('componentDidAppear', self);
		// Фокусировка экрана
		onFocusedScreen !== undefined
			? onFocusedScreen(true)
			: self.props.onFocusedScreen && self.props.onFocusedScreen(true);

		self.props = {...self.props, ...propsWix};
	};

	self.componentDidDisappear = () => {
		self.__proto__.componentDidDisappear && self.__proto__.componentDidDisappear.bind(self)();
		// Логика при снятии фокуса с экрана
		// Фокусировка экрана

		onFocusedScreen !== undefined
			? onFocusedScreen(false)
			: self.props.onFocusedScreen && self.props.onFocusedScreen(false);

		// Прокидывание пропсы
		propsWix = {};
		propsWix = {
			...propsWix,
			statusBar: statusBar ? undefined : statusBar,
			...(propsScreen || self.props),
		};
	};

	self.componentDidMount = () => {
		self.__proto__.componentDidMount && self.__proto__.componentDidMount.bind(self)();
		// console.log('componentDidMount');
		// Логика при монтировании
		BackHandler.addEventListener('hardwareBackPress', handleBackPress);
		StatusBar.setDarkTranslucent();
	};

	self.componentWillUnmount = () => {
		self.__proto__.componentWillUnmount && self.__proto__.componentWillUnmount.bind(self)();
		// Логика при размонтровании
		BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
	};

	self.componentWillUpdate = () => {
		self.__proto__.componentWillUpdate && self.__proto__.componentWillUpdate.bind(self)();
		// console.log('componentWillUpdate');
	};

	self.componentWillMount = () => {
		self.__proto__.componentWillMount && self.__proto__.componentWillMount.bind(self)();
		self.styles = styles ? Theme.createStyles(styles) : {};
		// console.log('componentWillMount');
	};

	// self.render = () => {
	// 	return (
	// 		<>
	// 			{rend()}
	// 			{self.__proto__.render.bind(self)()}
	// 		</>
	// 	);
	// };
};
