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
				/** Компонет начал отображаться на экрана */
			} else {
				/** Компонент прекратил отображение на экране */
			}
		});
	}

	/** Компонет начал отображаться на экрана */
	componentDidAppear() {}

	/** Компонент прекратил отображение на экране */
	componentDidDisappear() {}

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
					Screen2Screen
				</Text>
				<Text
					onPress={onBack}
					style={compose(
						styles.textScreen,
						{fontSize: 25},
					)}>
					onBack
				</Text>
			</View>
		);
	}
}

export default BindComponent(Screen, {style: Styles, isBack: false});
