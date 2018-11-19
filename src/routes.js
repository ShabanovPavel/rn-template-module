import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigator from './core/navigators/app-navigator';
import { addListener } from './core/redux-navigation';

class Routes extends React.PureComponent {
	render() {
		const { dispatch, nav } = this.props;
		return (
			<AppNavigator
				navigation={addNavigationHelpers({
					dispatch,
					state: nav,
					addListener,
				})}
			/>
		);
	}
}

const mapStateToProps = state => ({
	nav: state.nav,
});

export default connect(mapStateToProps)(Routes);
