import React from 'react';
import {Animated} from 'react-native';
import {Button} from '../Button';

const DURATION = 200;

type Props = {
	onPressIn?: Function,
	onPressOut?: Function,
	min?: Number,
	max?: Number,
};

class ScaleButton extends React.PureComponent<Props> {
	constructor(props) {
		super(props);
		this.scaleValue = new Animated.Value(1);
	}

	animateBig = () => {
		Animated.timing(this.scaleValue, {
			toValue: this.props.max,
			duration: DURATION,
			useNativeDriver: true,
		}).start();
	};

	animateLitle = () => {
		Animated.timing(this.scaleValue, {
			toValue: this.props.min,
			duration: DURATION,
			useNativeDriver: true,
		}).start();
	};

	handlePressIn = () => {
		this.animateLitle();
		this.props.onPressIn();
	};

	handlePressOut = () => {
		this.animateBig();
		this.props.onPressOut();
	};

	render() {
		const {onPressIn, onPressOut, ...other} = this.props;

		const scale = {
			transform: [
				{
					scale: this.scaleValue,
				},
			],
		};

		return (
			<Animated.View style={[scale]}>
				<Button
					onPressIn={this.handlePressIn}
					onPressOut={this.handlePressOut}
					activeOpacity={1}
					{...other}
				/>
			</Animated.View>
		);
	}
}

ScaleButton.defaultProps = {
	onPressIn: () => {},
	onPressOut: () => {},
	min: 0.95,
	max: 1,
};

export {ScaleButton};
