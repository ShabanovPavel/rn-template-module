import {Platform} from 'react-native';

export default theme => ({
	inputView: {
		flexDirection: 'row',
		height: 46,
		borderRadius: 8,
		backgroundColor: theme.color.GRAY_TEXT_INPUT,
		marginHorizontal: 20,
		marginVertical: 0,
		paddingLeft: 22,
		paddingRight: 22,
		marginBottom: 8,
	},
	error: {
		backgroundColor: theme.color.PINK,
	},
	input: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		fontSize: 17,
		marginTop: Platform.OS === 'ios' ? 10 : 0,
	},
	secureTextEntryView: {
		padding: 10,
		paddingTop: 12,
	},
	textInputColor: theme.color.GRAY_PLACEHOLDER,
	iconColor: theme.color.GRAY_LIGHT,
});
