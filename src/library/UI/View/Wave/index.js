import React, {PureComponent} from 'react';
import {Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';

export default class WaveView extends PureComponent {
	constructor(props) {
		super(props);
		this.opacity = new Animated.Value(0);
	}

	componentDidMount() {
		this.animateShow();
	}

	animateShow = toValue => {
		const {duration} = this.props;

		Animated.timing(this.opacity, {
			toValue,
			duration,
			easing: Easing.sin,
			useNativeDriver: true,
		}).start(() => {
			if (toValue > 0) {
				this.animateShow(0);
			} else this.animateShow(1);
		});
	};

	render() {
		const {style, children, start, end} = this.props;

		const opacity = {
			opacity: this.opacity.interpolate({
				inputRange: [0, 1],
				outputRange: [start, end],
			}),
		};

		return <Animated.View style={[style, opacity]}>{children}</Animated.View>;
	}
}

WaveView.propTypes = {
	start: PropTypes.number,
	end: PropTypes.number,
	duration: PropTypes.number,
	style: PropTypes.any,
};

WaveView.defaultProps = {
	end: 0.8,
	start: 0.3,
	duration: 1000,
};
