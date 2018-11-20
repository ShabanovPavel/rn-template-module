import { connect } from 'react-redux';
import LoginScreen from './components';
import loginReducer from './reducer';

const Login = connect(
	state => ({
		name: state.profile.name,
	}),
	dispatch => ({
		onUpdateName: () => {
			dispatch(loginReducer.goExit());
		},
	}),
)(LoginScreen);

export default Login;
