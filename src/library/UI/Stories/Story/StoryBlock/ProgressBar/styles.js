import {StyleSheet} from 'react-native';

export default theme =>
	StyleSheet.create({
		mainView: {
			paddingTop: 4,
			paddingBottom: 8,
		},
		container: {
			height: 4,
			backgroundColor: 'white',
			borderRadius: 2,
			marginHorizontal: 1,
		},
		absolute: {
			position: 'absolute',
			left: 0,
			top: 4,
		},
	});
