import React, {PureComponent} from 'react';
import {View, Animated, Easing} from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class PulseIndicator extends PureComponent {
	constructor(props) {
		super(props);

		this.renderComponent = this.renderComponent.bind(this);
	}

	renderComponent({index, count, progress}) {
		const {size, color} = this.props;

		const pulseStyle = {
			height: size,
			width: size,
			borderRadius: size / 2,
			backgroundColor: color,
			transform: [
				{
					scale: progress.interpolate({
						inputRange: [0, 0.67, 1],
						outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0],
					}),
				},
			],
			opacity: progress.interpolate({
				inputRange: [0, 0.67, 1],
				outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0],
			}),
		};

		return (
			<Animated.View style={styles.layer} {...{key: index}}>
				<Animated.View style={pulseStyle} />
			</Animated.View>
		);
	}

	render() {
		const {style, size: width, size: height, ...props} = this.props;

		return (
			<View style={[styles.container, style]}>
				<Indicator
					style={{width, height}}
					renderComponent={this.renderComponent}
					{...props}
					count={2}
				/>
			</View>
		);
	}
}
