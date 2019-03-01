import React from 'react';

import {Text, View, Spacer, BindComponent} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		BindComponent(this, {
			isBack: true,
		});
	}

	componentDidMount() {}

	componentWillUnmount() {}

	componentDidAppear() {}

	componentDidDisappear() {}

	render() {
		const {onClose} = this.props;
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Spacer h={50} />
				<Text onPress={onClose}>Hello, I am Playground</Text>
			</View>
		);
	}
}
