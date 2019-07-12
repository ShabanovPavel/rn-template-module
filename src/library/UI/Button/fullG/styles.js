export default theme => ({
	container: {
		flexDirection: 'row',
	},
	icon: {
		marginRight: 8,
		width: 16,
		height: 16,
	},
	inButtonContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},

	btnFull: {
		flex: 1,
		flexDirection: 'row',
		height: 52,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		overflow: 'hidden',
		backgroundColor: theme.color.BLUE,
	},
	textBtnFull: {
		fontSize: 17,
		fontWeight: '700', // semibold
		color: 'white',
	},
});
