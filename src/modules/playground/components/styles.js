import {StyleSheet} from 'react-native';

export default theme =>
	StyleSheet.create({
		safeArea: {
			flex: 1,
			justifyContent: 'center',
			backgroundColor: theme.color.GRADIENT,
		},
		mainContainer: {
			flex: 1,
			paddingTop: 24,
			justifyContent: 'center',
			backgroundColor: theme.color.GRADIENT,
		},
		contentContainer: {
			flex: 1,
			alignItems: 'center',
			backgroundColor: theme.color.GRAY_BORDER,
		},
		textScreen: {
			fontSize: 15,
			color: theme.color.BLACK,
		},
	});
