import React from 'react';
import {
	View as RNView,
	SafeAreaView as RNSafeAreaView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import LateView from './Late';
import WaveView from './Wave';
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
		const {style, pressDismissKeyboard, safeArea, screen, wave, late, ...other} = props;

		if (pressDismissKeyboard) {
			return (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<RNView {...other} style={{...styles.view, ...style}} />
				</TouchableWithoutFeedback>
			);
		}

		if (safeArea) {
			return <RNSafeAreaView {...other} style={{...styles.view, ...style}} />;
		}
		if (screen) {
			return <RNSafeAreaView {...other} style={{...styles.view, ...style}} />;
		}
		if (late) {
			return <LateView {...other} style={{...styles.view, ...style}} />;
		}
		if (wave) {
			return <WaveView {...other} style={[styles.view, style]} />;
		}
		return <RNView {...other} style={style} />;
	}
}

export {View};
