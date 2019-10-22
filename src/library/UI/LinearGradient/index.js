import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
// https://github.com/react-native-community/react-native-linear-gradient

/**
 * @module InitflowLinearGradient
 * @description градиент
 */
class InitflowLinearGradient extends React.PureComponent {
	render() {
		const {...other} = this.props;

		return <LinearGradient {...other} />;
	}
}

export {InitflowLinearGradient as LinearGradient};
