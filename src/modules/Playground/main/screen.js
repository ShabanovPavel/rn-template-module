import React from 'react';

import {pop, bindComponent} from '../../../core/navigation';
import {Text, View, StatusBar, Spacer, BackHandler} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		StatusBar.setLigthTranslucent();
		bindComponent(this);
		this.handleBackPress = () => pop(props.componentId);
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentDidMount() {}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

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
