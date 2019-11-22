import {StyleSheet, Platform} from 'react-native';

const SIZE = 130;
const BORDER_WIDTH = 1.5;
const sizeImage = SIZE - 2 * BORDER_WIDTH;

export default theme =>
	StyleSheet.create({
		storyView: {
			justifyContent: 'center',
			alignItems: 'center',
			width: SIZE,
			height: SIZE + (Platform.OS === 'ios' ? 0 : 6),
			marginRight: 12,
		},
		storyImageView: {
			marginBottom: 6,
			height: SIZE,
			width: SIZE,
			alignItems: 'center',
			justifyContent: 'center',
		},
		storyImage: {
			width: sizeImage,
			height: sizeImage,
			backgroundColor: theme.color.GRAY_ELEMENT_BAR,
		},
		storyText: {
			position: 'absolute',
			left: 16,
			right: 16,
			top: (sizeImage * 2) / 3 - 6,
			height: sizeImage - ((sizeImage * 2) / 3 - 6),
			fontSize: 13,
			fontWeight: theme.simple.fontWeight.medium,
			color: theme.color.WHITE,
			textAlign: 'center',
		},
		itemVisibility: {
			borderWidth: 2,
			borderColor: '#D0DADF',
		},
		internalGradient: {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			height: sizeImage,
		},
	});
