import React from 'react';
import {View, BindComponent, Text, Icon, Image, Button, Log, I} from '../../../library';
import Styles from './styles';

type Props = {};

export default class Screen extends React.PureComponent<Props> {
	constructor(props) {
		super(props);

		BindComponent(this, {
			styles: Styles,
			isBack: true, // работает ли бек
			statusBar: 'dark',
		});
	}

	render() {
		const {styles, props, propsWix} = this;
		const {} = props;

		return (
			<View safeArea style={{flex: 1, flexdirection: 'row'}}>
				<Text style={{fontSize: 45}}>Привет</Text>
				<Icon vector name="rocket" size={45} />
			</View>
		);
	}
}
