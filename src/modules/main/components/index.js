import React from 'react';
import {View, BindComponent, Text} from '../../../library';
import Styles from './styles';

type Props = {
	isLoadScreen: Boolean, // загрузился ли экран
	styles: Object, // стили для экрана
	compose: Function, // объединить стили
	setPropsWix: Function, // записывает какую либо информацию между экранами
	getPropsWix: Function, // возвращает пропсу между экранами
	onUpdateTheme: Function, // меняет тему приложения
	onBack: Function, // вызывает шаг назад по навигации стека
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
				/** Компонет начал отображаться на экрана */
			} else {
				/** Компонент прекратил отображение на экране */
			}
		});

		this.isTheme;
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
			isLoadScreen,
			onPushNavigation,
			onRegisterFocusScreen,
		} = props;

		return (
			<View safeArea style={styles.mainContainer}>
				<Text onPress={onClick} style={[styles.textScreen, {fontSize: 45}]}>
					MainScreen
				</Text>
				<Text
					style={compose(
						styles.textScreen,
						{fontSize: 25},
					)}
					onPress={() => {
						if (this.isTheme !== 'dark') {
							onUpdateTheme('dark');
							this.isTheme = 'dark';
						} else {
							onUpdateTheme('light');
							this.isTheme = 'light';
						}
					}}>
					UpdateTheme
				</Text>
			</View>
		);
	}
}

export default BindComponent(Screen, {style: Styles, statusBar: 'dark-tr'});
