import React from 'react';

import {Text, View, BindComponent} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		BindComponent(this, {
			isBack: true, // работает ли бек
		});
	}

	componentDidMount() {}

	componentWillUnmount() {
		this.onClearBindComponent();
	}

	componentDidAppear() {
		this.onFocus();
	}

	componentDidDisappear() {}

	render() {
		const {onClose} = this.props;
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text onPress={onClose}>Hello, I am Onboarding</Text>
			</View>
		);
	}
}
