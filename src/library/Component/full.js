import {BackHandler} from 'react-native';
import {pop, bindComponent, mergeOptions} from '../../core/navigation';
import {StatusBar} from '../StatusBar';
import {Theme} from '../Theme';
import {Utils} from '../Utils';

let propsWix = {
	_private: {},
};

/**
 * 	Расширяет компонент :
 *  state.isLoadScreen - показывает загрузился ли компонент или нет (полезно для рендеринга высоконагруженных компонентов)
 *
 *  propsWix - глобальная пропса для передаи данных между экранами минуя редакс
 *  setPropsWix - обновляет глобальную проспсу на подобии setState только с возможностью отчистки (1 уровень вложенности)
 * 	onBack - выполняет переход на предыдущий экран
 *  updateTheme - обновляет тему приложения
 *  componentDidAppear - вызывается когда компонент получил фокус
 *  componentDidDisappear - вызывается когда компонент потерял фокус
 *
 */

/**
 * @param {Object} self компонент подписи
 * @param {Object} options параметры компонента
 * @param {Boolean} options.isBack флаг который указывает возможно ли осуществление обработки кнопки бек
 * @param {String} options.statusBar ('light','dark','hide') указывает использовать светлый статус бар или же оставить темный статус бар  или вообще срыть
 * @param {Function} options.onFocusedScreen функция обработки фокусировки на экран (возвращает true or false в зависимости от фокусировки)
 * @param {Function} options.styles функция возвращаюзаяя стиль компонента
 */
export default (self, options = {}) => {
	const {isBack = true, statusBar, colorBackStatusBar, onFocusedScreen, styles} = options;
	bindComponent(self);
	const nameScreen = self.props.componentId;
	self.state = {...self.state, isLoadScreen: false};
	self.styles = styles ? Theme.createStyles(styles) : {};

	const handleBackPress = () => {
		if (isBack) {
			pop(nameScreen);
			return true;
		}
		return true;
	};

	/** Обновляет экран для отображения изменений (Вызывается оин раз при открытии экрана) */
	const updateScreen = () => {
		self.forceUpdate();
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
	self.compose = (...array) => {
		let r = {};
		array.forEach(element => {
			r = {...r, ...element};
		});
		return r;
	};

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

	/** Выполняет навигацию на первый экран */
	self.onBack = function() {
		pop(nameScreen);
	};

	/** Обновляет тему прилы */
	self.onUpdateTheme = theme => {
		Theme.setTheme(theme);
		updateScreen();
		self.styles = styles ? Theme.createStyles(styles) : {};
	};

	self.componentDidAppear = () => {
		setStatusBar();
		iosSwipeBack();
		// Фокусировка экрана
		onFocusedScreen !== undefined
			? onFocusedScreen({status: true, nameScreen})
			: self.props.onFocusedScreen && self.props.onFocusedScreen({status: true, nameScreen});

		self.timerLoading = setTimeout(() => {
			self.setState({isLoadScreen: true});
		}, 500);

		self.__proto__.componentDidAppear && self.__proto__.componentDidAppear.bind(self)();
		// console.log('componentDidAppear');
	};

	self.componentDidDisappear = () => {
		// Логика при снятии фокуса с экрана
		// Фокусировка экрана
		onFocusedScreen !== undefined
			? onFocusedScreen({status: false, nameScreen})
			: self.props.onFocusedScreen && self.props.onFocusedScreen({status: false, nameScreen});

		self.__proto__.componentDidDisappear && self.__proto__.componentDidDisappear.bind(self)();
		// console.log('componentDidDisappear');
	};

	self.componentDidMount = () => {
		self.styles = styles ? Theme.createStyles(styles) : {};
		BackHandler.addEventListener('hardwareBackPress', handleBackPress);

		self.__proto__.componentDidMount && self.__proto__.componentDidMount.bind(self)();
		// console.log('componentDidMount');
	};

	self.componentWillUnmount = () => {
		// Логика при размонтровании
		BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
		clearTimeout(self.timerLoading);
		self.__proto__.componentWillUnmount && self.__proto__.componentWillUnmount.bind(self)();
		// console.log('componentWillUnmount');
	};

	self.componentDidUpdate = () => {
		self.__proto__.componentDidUpdate && self.__proto__.componentDidUpdate.bind(self)();
		// console.log('componentWillUpdate');
	};
};
