import {StyleSheet} from 'react-native';

const SIZE = 130;

export default theme =>
	StyleSheet.create({
		storyView: {
			justifyContent: 'center',
			alignItems: 'center',
			width: SIZE,
			height: SIZE,
			marginRight: 12,
			backgroundColor: theme.color.DUMMY,
		},
	});
