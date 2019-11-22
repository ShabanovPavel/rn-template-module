import React from 'react';
import {
	BallIndicator,
	BarIndicator,
	DotIndicator,
	MaterialIndicator,
	PacmanIndicator,
	PulseIndicator,
	SkypeIndicator,
	UIActivityIndicator,
	WaveIndicator,
} from 'react-native-indicators';

class ActivityIndicator extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {props} = this;
		const {ball, dot, bar, material, pacman, pulse, skype, ...other} = props;

		if (ball) {
			return <BallIndicator {...other} />;
		}
		if (dot) {
			return <DotIndicator {...other} />;
		}
		if (bar) {
			return <BarIndicator {...other} />;
		}
		if (material) {
			return <MaterialIndicator {...other} />;
		}
		if (pacman) {
			return <PacmanIndicator {...other} />;
		}
		if (pulse) {
			return <PulseIndicator {...other} />;
		}
		if (skype) {
			return <SkypeIndicator {...other} />;
		}

		return <UIActivityIndicator {...other} />;
	}
}

export {ActivityIndicator};
