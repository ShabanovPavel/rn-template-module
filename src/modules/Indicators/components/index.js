import React from 'react';
import Styles from './styles';
import {
	Text,
	View,
	BindComponent,
	Button,
	Log,
	MaterialIndicator,
	DotIndicator,
	Indicator,
	BallIndicator,
	PulseIndicator,
	BarIndicator,
	PacmanIndicator,
	ActivityIndicator,
	SkypeIndicator,
	WaveIndicator,
} from '../../../library';

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
				<Button action={onBack} text='Hello, I am Indicators' />
				<MaterialIndicator />
				<DotIndicator count={3} animationDuration={800} />
				{/* <Indicator /> */}
				<BallIndicator animationDuration={800} />
				<PulseIndicator />
				<BarIndicator count={5} />
				<PacmanIndicator />
				<ActivityIndicator />
				<PulseIndicator />
				<SkypeIndicator />
				{/* <WaveIndicator count={2} waveFactor={0.4} waveMode='outline'/> */}
			</View>
		);
	}
}
