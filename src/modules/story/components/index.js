import React from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {BindComponent, Text, Button, Story, Log} from '../../../library';
import Styles from './styles';

const {height} = Dimensions.get('window');

type Props = {
	styles: Object, // стили для экрана
	onClose: Function,
	onLoadNext: Function, // Прогрузка истории
};

class Screen extends React.PureComponent<Props> {
	constructor(props) {
		super(props);

		this.animatedValue = new Animated.Value(-height);
	}

	componentDidMount() {
		this.animate(0);
	}

	animate = (toValue, duration = 400, callback = () => {}) => {
		Animated.timing(this.animatedValue, {
			toValue,
			duration,
			useNativeDriver: true,
		}).start(callback);
	};

	handleOnClose = () => {
		const {onClose} = this.props;
		this.animate(-height, 400, onClose);
	};

	render() {
		const {styles, story, storyId, onLoadNext} = this.props;

		return (
			<View style={styles.mainContainer}>
				<Animated.View
					style={[styles.animatedContainer, {transform: [{translateY: this.animatedValue}]}]}>
					<Story
						items={story}
						storyInitKey={storyId}
						onClose={this.handleOnClose}
						onOpenStories={onLoadNext}
					/>
				</Animated.View>
			</View>
		);
	}
}

export default BindComponent(Screen, {
	style: Styles,
	statusBar: 'hide',
	colorBackStatusBar: '#21273d',
});
