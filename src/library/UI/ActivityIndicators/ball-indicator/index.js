import React, {PureComponent} from 'react';
import {View, Animated} from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class BallIndicator extends PureComponent {
	constructor(props) {
		super(props);

		this.renderComponent = this.renderComponent.bind(this);
	}

	renderComponent({index, count, progress}) {
		const {size, color: backgroundColor} = this.props;
		const angle = (index * 360) / count;

		const layerStyle = {
			transform: [
				{
					rotate: `${angle}deg`,
				},
			],
		};

		const inputRange = Array.from(new Array(count + 1), (undefined, index) => index / count);

		const outputRange = Array.from(
			new Array(count),
			(undefined, index) => 1.2 - (0.5 * index) / (count - 1),
		);

		for (let j = 0; j < index; j++) {
			outputRange.unshift(outputRange.pop());
		}

		outputRange.unshift(...outputRange.slice(-1));

		const ballStyle = {
			margin: size / 20,
			backgroundColor,
			width: size / 5,
			height: size / 5,
			borderRadius: size / 10,
			transform: [
				{
					scale: progress.interpolate({inputRange, outputRange}),
				},
			],
		};

		return (
			<Animated.View style={[styles.layer, layerStyle]} {...{key: index}}>
				<Animated.View style={ballStyle} />
			</Animated.View>
		);
	}

	render() {
		const {style, size: width, size: height, ...props} = this.props;

		return (
			<View style={[styles.container, style]}>
				<Indicator style={{width, height}} renderComponent={this.renderComponent} {...props} />
			</View>
		);
	}
}
