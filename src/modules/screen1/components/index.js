import React from 'react';
import {View, BindComponent, Text} from '../../../library';
import Styles from './styles';

type Props = {
	onClick: Function,
};

export default class Screen extends React.PureComponent<Props> {
	constructor(props) {
		super(props);

		BindComponent(this, {
			styles: Styles,
			statusBar: 'dark-tr',
		});
	}

	/** Компонет начал отображаться на экрана */
	componentDidAppear() {}

	/** Компонент прекратил отображение на экране */
	componentDidDisappear() {}

	render() {
		const {
			state, // состояние компонента
			props, // пропса компонента
			setPropsWix, // записывает какую либо информацию между экранами
			getPropsWix, // возвращает пропсу между экранами
			onUpdateTheme, // меняет тему приложения
			onBack, // вызывает шаг назад по навигации
			compose, // объединить стили
			styles, // стили для экрана
		} = this;
		const {onClick} = props;
		const {
			isLoadScreen, // загрузился ли экран
		} = state;

		return (
			<View safeArea style={styles.mainContainer}>
				<Text
					onPress={onClick}
					style={compose(
						styles.textScreen,
						{fontSize: 45},
					)}>
					Screen1Screen
				</Text>
			</View>
		);
	}
}
