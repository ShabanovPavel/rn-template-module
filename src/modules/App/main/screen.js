import React from 'react';
import {AnalyticService} from '../../../core/analytic-service';

import {bindComponent, traking} from '../../../core/navigation';
import {Text, View, StatusBar, BackHandler, SplashScreen, Theme} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		StatusBar.setDarkTranslucent();
		Theme.setBalck();
		bindComponent(this);
		traking({analytic: AnalyticService.instance()});
		this.handleBackPress = () => true;
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentDidMount() {
		SplashScreen();
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentDidAppear() {}

	componentDidDisappear() {}

	render() {
		const {onOpenOnboarding, onOpenPlayground} = this.props;
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>Hello, I am initScreen</Text>
				<Text onPress={onOpenOnboarding}>Open Onboarding</Text>
				<Text onPress={onOpenPlayground}>Open Playground</Text>
			</View>
		);
	}
}
