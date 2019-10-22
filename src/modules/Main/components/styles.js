export default theme => ({
	safeArea: {
		...theme.view.safeArea,
		backgroundColor: 'transparent',
	},
	mainContainer: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	scrollContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 140,
	},
	hint: {
		color: 'white',
		marginBottom: 4,
		fontWeight: theme.simple.fontWeight.light,
	},
	textInput: {
		marginBottom: 18,
		backgroundColor: 'white',
		width: 300,
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textInputPicker: {
		marginBottom: 18,
		backgroundColor: 'white',
		width: 300,
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 38,
		overflow: 'hidden',
	},
	color: {
		GRADIENT_DARK: theme.color.GRADIENT_DARK,
		GRADIENT: theme.color.GRADIENT,
	},
	input: {
		...theme.view.input,
	},
	logo: {
		height: 57,
		width: 200,
		marginBottom: 100,
		borderRadius: 6,
	},
	splash: {
		width: theme.simple.sizeScreen.width,
		height: theme.simple.sizeScreen.height,

		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	}
});
