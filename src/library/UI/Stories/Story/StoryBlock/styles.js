import {StyleSheet, Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

export default theme =>
	StyleSheet.create({
		container: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: -40,
		},
		errorView: {
			width,
			height,
			position: 'absolute',
			top: 0,
			left: 0,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.color.GRADIENT,
		},
		absolute: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
		content: {
			position: 'absolute',
			left: 20,
			right: 20,
			bottom: 80,
		},
		imgStory: {
			flex: 1,
			width,
		},
		toolsBar: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginTop: 4,
			marginHorizontal: 20,
		},
		imgView: {
			flexDirection: 'row',
			alignItems: 'center',
			flex: 1,
		},
		btn: {
			paddingVertical: 8,
			paddingLeft: 8,
		},
		title: {
			fontSize: 24,
			fontWeight: theme.simple.fontWeight.bold,
			color: theme.color.WHITE,
		},
		description: {
			marginVertical: 20,
			fontSize: 20,
			lineHeight: 32,
			color: theme.color.WHITE,
		},
		progressView: {
			flexDirection: 'row',
			justifyContent: 'center',
			marginTop: Platform.OS === 'ios' ? 8 : 32,
			height: 12,
		},
		leftPart: {
			position: 'absolute',
			left: 0,
			top: 0,
			bottom: 0,
			width: width / 2,
		},
		rightPart: {
			position: 'absolute',
			right: 0,
			top: 0,
			bottom: 0,
			width: width / 2,
		},
		infoBtn: {
			width: 120,
			height: 50,
			backgroundColor: theme.color.GRADIENT,
			alignItems: 'center',
			justifyContent: 'center',
		},
		internalGradient: {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			height: (height / 5) * 3,
		},
		btnSize: {
			width: 123,
			height: 53,
		},
	});
