import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
// https://github.com/react-native-community/react-native-linear-gradient

/**
 * @module InitflowLinearGradient
 * @description градиент
 */
class InitflowLinearGradient extends React.PureComponent {
	render() {
		return <LinearGradient {...this.props} />;
	}
}

InitflowLinearGradient.propTypes = {
	...LinearGradient.PropTypes,
};

export {InitflowLinearGradient as LinearGradient};
