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
 * @param {*} Component
 * @param {*} {style, statusBar, isBack, colorBackStatusBar}
 * @returns
 */
export default function full(Component, {style, statusBar, isBack = true, colorBackStatusBar}) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			bindComponent(this);
			this.state = {
				nameScreen: props.componentId,
				onFocusScreen: () => {},
				statusBar,
				_isBack: isBack,
				isLoadScreen: false,
				styles: style ? Theme.createStyles(style) : {},
			};
		}

		updateStyles() {
			this.setState({
				styles: style ? Theme.createStyles(style) : {},
			});
		}

		iosSwipeBack = () => {
			const {_isBack, nameScreen} = this.state;
			mergeOptions(nameScreen, {
				popGesture: _isBack,
			});
		};

		handleBackPress = () => {
			const {_isBack, nameScreen} = this.state;
			if (_isBack) {
				pop(nameScreen);
				return true;
			}
			return true;
		};

		setStatusBar() {
			const {nameScreen} = this.state;
			let status = statusBar;

			if (!status) {
				status = Utils.getKeyObject(propsWix, 'statusBar');
			} else {
				propsWix = {...propsWix, _private: {...propsWix._private, statusBar}};
			}
			switch (status) {
				case 'light':
					StatusBar.setStatus({
						nameScreen,
						hide: false,
						style: 'light',
						colorBackStatusBar: Theme.theme.color[colorBackStatusBar],
					});
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
					StatusBar.setStatus({
						nameScreen,
						hide: false,
						style: 'dark',
						colorBackStatusBar: Theme.theme.color[colorBackStatusBar],
					});
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
					StatusBar.setStatus({
						nameScreen,
						hide: true,
						colorBackStatusBar: Theme.theme.color[colorBackStatusBar],
					});
					break;
				default:
					StatusBar.setStatus({
						nameScreen,
						colorBackStatusBar: Theme.theme.color[colorBackStatusBar],
					});
					break;
			}
		}

		/** Настанавливает пропсу доступную на экранах */
		setPropsWix = (props, isClear = false) => {
			if (isClear) propsWix = {_private: {...propsWix._private}};
			propsWix = {...propsWix, ...props};
		};

		/** Возвращает пропсу викса */
		getPropsWix = () => {
			const {_private, ...other} = propsWix;
			return other;
		};

		/** Выполняет навигацию на первый экран */
		onBack = () => {
			const {nameScreen} = this.state;
			pop(nameScreen);
		};

		/** Обновляет тему прилы */
		onUpdateTheme = theme => {
			Theme.setTheme(theme);
			this.updateStyles();
		};

		onPushNavigation = nextScreen => {
			const {nameScreen} = this.state;
			push(nameScreen, nextScreen);
		};

		onTabNavigation = nextScreen => {
			// TODO
		};

		componentDidAppear() {
			this.setStatusBar();
			this.iosSwipeBack();
			this.setState({
				isLoadScreen: true,
			});
			this.updateStyles();
			const {onFocusScreen} = this.state;
			onFocusScreen(true);
		}

		componentDidDisappear() {
			const {onFocusScreen} = this.state;
			onFocusScreen(false);
			// Логика при снятии фокуса с экрана
		}

		componentDidMount() {
			this.updateStyles();
			BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
		}

		componentWillUnmount() {
			// Логика при размонтровании
			BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
		}

		componentDidUpdate() {}

		render() {
			const {styles, isLoadScreen} = this.state;
			// Оборачиваем компонент в контейнер без мутаций. Супер!
			return (
				<Component
					{...this.props}
					styles={styles}
					isLoadScreen={isLoadScreen}
					compose={Utils.compose}
					onUpdateTheme={this.onUpdateTheme}
					onBack={this.onBack}
					onPushNavigation={this.onPushNavigation}
					onRegisterFocusScreen={callback => {
						this.setState({onFocusScreen: callback});
					}}
				/>
			);
		}
	};
}
