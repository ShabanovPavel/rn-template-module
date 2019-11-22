import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, Dimensions} from 'react-native';

import {View} from '../../../View';
import {Button} from '../../../Button';
import {ActivityIndicator} from '../../../ActivityIndicator';
import {Icon} from '../../../Icon';
import {Image} from '../../../Image';
import {Text} from '../../../Text';
import {Links} from '../../../../Links';
import {LinearGradient} from '../../../LinearGradient';

import ProgressBar from './ProgressBar';
import GestureRecognizer from './GestureRecognizer';

import {Theme} from '../../../../Theme';
import Styles from './styles';

const {width} = Dimensions.get('window');

const DURATION = 8000;
const CONFIG = {
	velocityThreshold: 0.4,
	directionalOffsetThreshold: 100,
};

export default class StoryBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgIndex: 0,
			prevImgIndex: 0,
			isFocus: true,

			// нужны для остановки времени при зажатии стории
			isStop: false,
			isLoadImage: true,
			pressInTime: undefined,
		};
	}

	componentDidMount() {
		const {navigation} = this.props;
		const {imgIndex} = this.state;

		// работает с временем отображения сторис
		if (navigation) {
			this.focusListenerFocus = navigation.addListener('didFocus', () => {
				this.setState({imgIndex: 0, prevImgIndex: imgIndex, isFocus: true});
			});
			this.focusListenerBlur = navigation.addListener('didBlur', () => {
				this.setState({imgIndex: 0, prevImgIndex: imgIndex, isFocus: false});
			});
		}
		setTimeout(() => this.forceUpdate(), 100);
	}

	componentWillUnmount() {
		this.focusListenerFocus.remove();
		this.focusListenerBlur.remove();
	}

	timerAction = index => {
		const {
			screenProps: {itemsKey, params},
			navigation: {
				state: {key},
				navigate,
			},
		} = this.props;
		const {items} = params[key];

		try {
			// есть ли еще этапы в этой стори
			if (index + 1 < items.length) {
				// если этапы есть
				this.setState({imgIndex: index + 1, prevImgIndex: index});
			} else {
				const lastKey = itemsKey[itemsKey.length - 1];
				// если это не последняя стори, то открываем следующую стори
				if (key !== lastKey) {
					const indexKey = itemsKey.indexOf(key);
					navigate(itemsKey[indexKey + 1]);
				}
			}
		} catch {}
	};

	timerActionPrev = index => {
		const {
			screenProps: {itemsKey},
			navigation: {
				state: {key},
				navigate,
			},
		} = this.props;

		try {
			// есть ли еще есть этапы в этой стори
			if (index - 1 >= 0) {
				this.setState({imgIndex: index - 1, prevImgIndex: index});
			}
		} catch {}
	};

	handleOnPressIn = () => {
		this.setState({isStop: true, pressInTime: Date.now()});
	};

	handleOnPressOut = () => {
		const {imgIndex, pressInTime} = this.state;

		this.setState({isStop: false});
		if (Date.now() - pressInTime < 150) {
			this.timerNextStep = setTimeout(() => this.timerAction(imgIndex), 100);
		}
	};

	handleOnPressOutPrev = () => {
		const {imgIndex, pressInTime} = this.state;

		this.setState({isStop: false});
		if (Date.now() - pressInTime < 150) {
			this.timerNextStep = setTimeout(() => this.timerActionPrev(imgIndex), 100);
		}
	};

	handleMove = e => {
		// если было движение пальцами то отменить переход к следуюшей картинке
		clearTimeout(this.timerNextStep);
	};

	handleOnTimerAction = index => () => {
		this.timerAction(index);
	};

	handleActionBar = index => () => {
		const {imgIndex} = this.state;
		this.setState({imgIndex: index, prevImgIndex: imgIndex});
	};

	handleSwipeVertical = e => {
		const {
			screenProps: {onClose},
		} = this.props;

		onClose();
	};

	handleSwipeLeft = e => {
		const {
			navigation: {
				state: {key},
			},
			screenProps: {itemsKey, onClose},
		} = this.props;

		const lastKey = itemsKey[itemsKey.length - 1];
		if (lastKey === key) {
			onClose();
		}
	};

	handleSwipeRight = e => {
		const {
			navigation: {
				state: {key},
			},
			screenProps: {itemsKey, onClose},
		} = this.props;

		const firstKey = itemsKey[0];
		if (firstKey === key) {
			onClose();
		}
	};

	handleLoadStart = event => {
		this.setState({isLoadImage: true});
	};

	handleLoadEnd = event => {
		this.setState({isLoadImage: false});
	};

	handleOpenInfo = item => () => {
		Links.onLinking(item.urlDetailInfo);
	};

	render() {
		// Log('!libStory/StoryBlock', this.props);
		const {
			navigation: {
				state: {key},
			},
			screenProps: {onClose, params},
		} = this.props;
		const {imgIndex, prevImgIndex, isFocus, isStop, isLoadImage} = this.state;
		const styles = Theme.createStyles(Styles);
		const color = Theme.getColors();

		const {items = {}} = params[key];
		const prevItem = items[prevImgIndex] || {};
		const item = items[imgIndex] || {};
		const uriImg = item.uri ? {uri: item.uri, isStatic: true} : undefined;
		const prevUriImg = prevItem.uri ? {uri: prevItem.uri, isStatic: true} : undefined;

		return (
			<GestureRecognizer
				onSwipeUp={this.handleSwipeVertical}
				// onSwipeDown={this.handleSwipeVertical}
				onSwipeLeft={this.handleSwipeLeft}
				onSwipeRight={this.handleSwipeRight}
				onMove={this.handleMove}
				config={CONFIG}
				style={styles.container}>
				{/* Картинка */}
				<View style={styles.absolute}>
					{uriImg ? (
						<View style={{flex: 1}}>
							<View style={styles.absolute}>
								<Image isFast style={styles.imgStory} uri={prevUriImg} resizeMode="cover" />
							</View>
							<View style={styles.absolute}>
								<Image
									isFast
									style={styles.imgStory}
									uri={uriImg}
									onLoadStart={this.handleLoadStart}
									onLoadEnd={this.handleLoadEnd}
									resizeMode="cover"
								/>
							</View>
						</View>
					) : (
						<View style={styles.errorView}>
							<ActivityIndicator animating size={40} color={color.WHITE} />
						</View>
					)}

					{/* Текст описания этапа стори */}
					{item && (item.title || item.description) && (
						<View safeArea style={styles.absolute} pointerEvents="box-none">
							<LinearGradient
								locations={[0, 0.5, 1]}
								start={{x: 0, y: 1}}
								end={{x: 0, y: 0}}
								colors={[color.GRADIENT, color.GRADIENT, '#0000']}
								style={styles.internalGradient}
								pointerEvents="auto"
							/>
							<View style={styles.content} pointerEvents="auto">
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.description}>{item.description}</Text>
								<View style={styles.btnSize} />
							</View>
						</View>
					)}
				</View>

				<Button
					activeOpacity={1}
					onPressIn={this.handleOnPressIn}
					onPressOut={this.handleOnPressOutPrev}
					style={styles.leftPart}
				/>
				<Button
					activeOpacity={1}
					onPressIn={this.handleOnPressIn}
					onPressOut={this.handleOnPressOut}
					style={styles.rightPart}
				/>

				<View style={styles.content} pointerEvents="auto">
					{item.urlDetailInfo && (
						<View pointerEvents="auto">
							<Button grad onAction={this.handleOpenInfo(item)} style={styles.btnSize}>
								<View style={styles.infoBtn}>
									<Text i18n style={{color: color.WHITE}}>
										Подробнее
									</Text>
								</View>
							</Button>
						</View>
					)}
				</View>

				{/* Прогресс бар */}
				<SafeAreaView>
					<View style={styles.progressView}>
						{items.map((item, index) => (
							<ProgressBar
								key={index}
								width={(width - 20 * 2) / items.length - 2}
								isFull={index < imgIndex}
								isAnimated={uriImg && isFocus && imgIndex === index && !isLoadImage}
								isStop={isStop}
								duration={DURATION}
								onAction={this.handleActionBar(index)}
								timerAction={this.handleOnTimerAction(index)}
							/>
						))}
					</View>
				</SafeAreaView>

				{/* Кнопка Закрыть */}
				<View style={styles.toolsBar}>
					<View style={{flex: 1}} />
					<Button onAction={onClose} style={styles.btn}>
						<Icon name="CLOSE" color={color.WHITE} />
					</Button>
				</View>
			</GestureRecognizer>
		);
	}
}

StoryBlock.propTypes = {
	navigation: PropTypes.object,
	screenProps: PropTypes.shape({
		onClose: PropTypes.func,
		itemsKey: PropTypes.array,
	}),
};

StoryBlock.defaultProps = {
	navigation: undefined,
	screenProps: {
		onClose: () => {},
		itemsKey: undefined,
	},
};
