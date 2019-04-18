import React from 'react';
import Styles from './styles';
import {Text, View, BindComponent, Button, Log} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		BindComponent(this, {
			styles: Styles,
			isBack: true, // работает ли бек
			statusBar: 'light',
		});
	}

	componentDidMount() {}

	componentWillUnmount() {}

	componentAppear() {}

	componentDisappear() {}

	render() {
		const {styles, props, onBack} = this;
		return (
			<View style={styles.mainContainer}>
				<Button action={onBack} text='Hello, I am Onboarding' />
			</View>
		);
	}
}
