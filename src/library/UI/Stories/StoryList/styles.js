import {StyleSheet} from 'react-native';

export default theme =>
	StyleSheet.create({
		contentView: {
			paddingLeft: 12,
			paddingRight: 24,
			paddingVertical: 12,
			backgroundColor: theme.color.GRADIENT2,
		},
	});
