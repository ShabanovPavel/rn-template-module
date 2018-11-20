import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { profileScreen, loginScreen } from './modules';

const Root = () => (
	<Router>
		<Stack key='root'>
			<Scene key='login' component={loginScreen} title='Login' initial />
			<Scene key='profile' component={profileScreen} title='Profile' />
		</Stack>
	</Router>
);

const mapStateToProps = state => ({
	nav: state.nav,
});

export default connect(mapStateToProps)(Root);
