import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
// https://github.com/react-native-community/react-native-linear-gradient

/**
 * @module InitflowLinearGradient
 * @description градиент
 */
class InitflowLinearGradient extends React.PureComponent {
	render() {
		return <LinearGradient locations={[0, 1]} {...this.props} />;
	}
}

export {InitflowLinearGradient as LinearGradient};
