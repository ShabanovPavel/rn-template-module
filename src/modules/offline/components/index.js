import React from 'react';
import Styles from './styles';

import {View, BindComponent, Text} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		BindComponent(this, {
			styles: Styles,
			isBack: false, // работает ли бек
			// statusBar: 'light',
		});
	}

	componentDidMount() {}

	componentWillUnmount() {}

	componentAppear() {}

	componentDisappear() {}

	render() {
		const {styles, props, onBack, state} = this;

		return (
			<View safeArea style={styles.mainContainer}>
				<Text>Offline </Text>
			</View>
		);
	}
}
