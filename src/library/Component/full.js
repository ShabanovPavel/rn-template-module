import {BackHandler} from 'react-native';
import React from 'react';
import {pop, bindComponent, mergeOptions, push} from '../../core/navigation';
import {StatusBar} from '../StatusBar';
import {Theme} from '../Theme';
import {Utils} from '../Utils';

let propsWix = {
	_private: {},
};

/**
 *	Расширяет компонент :
 *  state.isLoadScreen - показывает загрузился ли компонент или нет (полезно для рендеринга высоконагруженных компонентов)
 *
 *  propsWix - глобальная пропса для передаи данных между экранами минуя редакс
 *  setPropsWix - обновляет глобальную проспсу на подобии setState только с возможностью отчистки (1 уровень вложенности)
 * 	onBack - выполняет переход на предыдущий экран
 *  updateTheme - обновляет тему приложения
 *  componentDidAppear - вызывается когда компонент получил фокус
 *  componentDidDisappear - вызывается когда компонент потерял фокус
 *
 * @export
 * @param {*} self
 * @param {*} {style, statusBar, isBack, colorBackStatusBar}
 * @returns
 */
export default (self, {style, statusBar, isBack = true, colorBackStatusBar}) => {
	bindComponent(self);
	const nameScreen = self.props.componentId;
	self.state = {...self.state, isLoadScreen: false};
	self.styles = style ? Theme.createStyles(style) : {};

	const updateStyles = () => {
		self.styles = style ? Theme.createStyles(style) : {};
		self.forceUpdate();
	};

	const handleBackPress = () => {
		if (isBack) {
			pop(nameScreen);
			return true;
		}
		return true;
	};

	const setStatusBar = () => {
		let status = statusBar;
		if (!status) {
			status = Utils.getKeyObject(propsWix, 'statusBar');
		} else {
			propsWix = {...propsWix, _private: {...propsWix._private, statusBar}};
		}
		switch (status) {
			case 'light':
				StatusBar.setStatus({nameScreen, hide: false, style: 'light', colorBackStatusBar});
				break;
			case 'light-tr':
				StatusBar.setStatus({
					nameScreen,
					style: 'light',
					hide: false,
					translucent: true,
					colorBackStatusBar: 'rgba(255,255,255,0)',
				});
				break;
			case 'dark':
				StatusBar.setStatus({nameScreen, hide: false, style: 'dark', colorBackStatusBar});
				break;
			case 'dark-tr':
				StatusBar.setStatus({
					nameScreen,
					style: 'dark',
					hide: false,
					translucent: true,
					colorBackStatusBar: 'rgba(255,255,255,0)',
				});
				break;
			case 'hide-tr':
				StatusBar.setStatus({
					nameScreen,
					hide: true,
					translucent: true,
					colorBackStatusBar: 'rgba(255,255,255,0)',
				});
				break;
			case 'hide':
				StatusBar.setStatus({nameScreen, hide: true, colorBackStatusBar});
				break;
			default:
				StatusBar.setStatus({nameScreen, colorBackStatusBar});
				break;
		}
	};

	const iosSwipeBack = () => {
		mergeOptions(nameScreen, {
			popGesture: isBack,
		});
	};

	/** мерджит стили в один объект */
	self.compose = Utils.compose;

	/** Настанавливает пропсу доступную на экранах */
	self.setPropsWix = (props, isClear = false) => {
		if (isClear) propsWix = {_private: {...propsWix._private}};
		propsWix = {...propsWix, ...props};
	};

	/** Возвращает пропсу викса */
	self.getPropsWix = () => {
		const {_private, ...other} = propsWix;
		return other;
	};

	/**  Выполняет навигацию на первый экран  */
	self.onBack = function() {
		pop(nameScreen);
	};

	/** Обновляет тему прилы */
	self.onUpdateTheme = theme => {
		Theme.setTheme(theme);
		updateStyles();
	};

	self.onPushNavigation = (nextScreen, params) => {
		push(nameScreen, nextScreen, {}, params);
	};
	self.onTabNavigation = nextScreen => {
		// TODO
	};

	self.componentDidAppear = () => {
		setStatusBar();
		iosSwipeBack();
		this.timerLoading = setTimeout(() => {
			self.setState({isLoadScreen: true});
		}, 500);

		self.__proto__.componentDidAppear && self.__proto__.componentDidAppear.bind(self)();
		// console.log('componentDidAppear');
	};

	self.componentDidDisappear = () => {
		// Логика при снятии фокуса с экрана

		self.__proto__.componentDidDisappear && self.__proto__.componentDidDisappear.bind(self)();
		// console.log('componentDidDisappear');
	};

	self.componentDidMount = () => {
		// Логика при монтировании
		updateStyles();
		BackHandler.addEventListener('hardwareBackPress', handleBackPress);

		self.__proto__.componentDidMount && self.__proto__.componentDidMount.bind(self)();
		// console.log('componentDidMount');
	};

	self.componentWillUnmount = () => {
		// Логика при размонтровании

		BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
		clearTimeout(this.timerLoading);

		self.__proto__.componentWillUnmount && self.__proto__.componentWillUnmount.bind(self)();
		// console.log('componentWillUnmount');
	};

	self.componentDidUpdate = () => {
		self.__proto__.componentDidUpdate && self.__proto__.componentDidUpdate.bind(self)();
		// console.log('componentWillUpdate');
	};
};
