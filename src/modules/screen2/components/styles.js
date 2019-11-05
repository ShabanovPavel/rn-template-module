import {StyleSheet} from 'react-native';

export default theme =>
	StyleSheet.create({
		mainContainer: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.color.GRAY_BORDER,
		},
		textScreen: {
			fontSize: 15,
			color: theme.color.BLACK,
		},
	});
