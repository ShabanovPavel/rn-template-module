import React from 'react';
import {
	View as RNView,
	SafeAreaView as RNSafeAreaView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import Styles from './styles';
import {BindSimple} from '../../Component';

/**
 *  Обетка над видженом
 *
 * @class View
 * @extends {React.PureComponent}
 */
class View extends React.PureComponent {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;
		const {style, pressDismissKeyboard, safeArea} = props;

		if (pressDismissKeyboard) {
			return (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<RNView {...props} style={{...styles.view, ...style}} />
				</TouchableWithoutFeedback>
			);
		}

		if (safeArea) {
			return <RNSafeAreaView {...props} style={{...styles.view, ...style}} />;
		}
		return <RNView {...props} style={{...styles.view, ...style}} />;
	}
}

export {View};
