import {StyleSheet} from 'react-native';

export default theme =>
	StyleSheet.create({
		text: {
			fontSize: 16,
			color: theme.color.BLACK,
			letterSpacing: 0.32,
		},
		screen: theme.simple.sizeScreen,
	});
