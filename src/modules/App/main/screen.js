import React from 'react';
import {AnalyticService} from '../../../core/analytic-service';

import {traking} from '../../../core/navigation';
import {Text, View, BackHandler, SplashScreen, Theme, BindComponent} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		BindComponent(this, {
			isLightStatus: true,
		});
		Theme.setBalck();
		traking({analytic: AnalyticService});
	}

	componentDidMount() {
		SplashScreen();
	}

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
