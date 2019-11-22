import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';
import {Button} from '../../../../Button';
import {Theme} from '../../../../../Theme';
import {View} from '../../../../View';
import Styles from './styles';

// width, isAnimated, isFull, duration
export default class ProgressBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			animatedValue: new Animated.Value(0),
			timeStart: undefined,
			timeDif: undefined,
		};
	}

	componentDidUpdate(prevProps) {
		const nextProps = this.props;
		const {isAnimated, isFull, isStop, duration} = prevProps;
		const {timeStart, animatedValue, timeDif} = this.state;

		if (isAnimated && !isStop && nextProps.isStop) {
			const timeStop = Date.now();
			const dif = timeStop - timeStart;
			this.setState({timeDif: dif});

			animatedValue.stopAnimation();
		}

		if (isAnimated && isStop && !nextProps.isStop) {
			this.animationAgain(duration - timeDif);
		}

		// если прогресБар был в процессе анимации и состояние изменилось на не анимировать
		if (isAnimated && !nextProps.isAnimated) {
			this.state.animatedValue.stopAnimation();
			if (isFull) {
				this.state.animatedValue.setValue(1);
			} else {
				this.state.animatedValue.setValue(0);
			}
		}

		// если прогрессБар был не анимирован и состояние изменилось на запуск анимации
		if (!isAnimated && nextProps.isAnimated) {
			this.animation();
		}
	}

	animation() {
		const {duration} = this.props;

		this.setState({timeStart: Date.now()});

		this.state.animatedValue.stopAnimation();
		this.state.animatedValue.setValue(0);

		Animated.timing(this.state.animatedValue, {
			toValue: 1,
			duration,
		}).start(e => {
			if (e.finished) {
				this.props.timerAction();
			}
		});
	}

	animationAgain(speed) {
		const {duration} = this.props;

		this.setState({timeStart: Date.now() - (duration - speed)});

		Animated.timing(this.state.animatedValue, {
			toValue: 1,
			duration: speed,
		}).start(e => {
			if (e.finished) {
				this.props.timerAction();
			}
		});
	}

	render() {
		const {width, isAnimated, isFull, onAction} = this.props;
		const styles = Theme.createStyles(Styles);

		const minWidth = 4;
		const animatedWidth = this.state.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [minWidth, width],
		});

		return (
			<Button onAction={onAction} style={styles.mainView}>
				<View style={[styles.container, {width, opacity: 0.5}]} />
				<Animated.View
					style={[
						styles.container,
						styles.absolute,
						isAnimated ? {width: animatedWidth} : {width: isFull ? width : 0},
					]}
				/>
			</Button>
		);
	}
}

ProgressBar.propTypes = {
	width: PropTypes.number,
	isAnimated: PropTypes.bool,
	isFull: PropTypes.bool,
	duration: PropTypes.number,
	onAction: PropTypes.func,
	isStop: PropTypes.bool,
	timerAction: PropTypes.func,
};

ProgressBar.defaultProps = {
	width: undefined,
	isAnimated: false,
	isFull: false,
	duration: 5000,
	onAction: undefined,
	isStop: false,
	timerAction: () => {},
};
