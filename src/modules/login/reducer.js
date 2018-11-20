import { LOGIN_SET_NAME } from './action';

function login(
	state = {
		name: 'Василий',
	},
	action = {},
) {
	switch (action.type) {
		default:
			return state;
	}
}

// ----Функции с какой-либо бизнес логикой
login.goExit = () => dispatch => {
	dispatch({
		type: LOGIN_SET_NAME,
	});
};

export default login;
