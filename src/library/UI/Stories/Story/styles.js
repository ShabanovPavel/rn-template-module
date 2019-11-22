import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default theme =>
	StyleSheet.create({
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
	});
