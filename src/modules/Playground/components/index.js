import React from 'react';
import Styles from './styles';
import {Text, View, Spacer, BindComponent, Button} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		BindComponent(this, {
			styles: Styles,
			isBack: true,
		});
	}

	componentDidMount() {}

	componentWillUnmount() {}

	componentDidAppear() {}

	componentDidDisappear() {}

	render() {
		const {styles, props, onBack} = this;
		const {onOpenOnboarding} = props;
		return (
			<View style={styles.mainContainer}>
				<Button action={onBack} text='Hello, I am Playground' />
				<Button action={onOpenOnboarding} text='Open Onboarding' />
			</View>
		);
	}
}