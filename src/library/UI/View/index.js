import React from 'react';
import {View as RNView, SafeAreaView as RNSafeAreaView} from 'react-native';
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
		const {styles, props, safeArea} = this;
		const {style} = props;

		return safeArea ? (
			<RNSafeAreaView {...props} style={{...styles.view, ...style}} />
		) : (
			<RNView {...props} style={{...styles.view, ...style}} />
		);
	}
}

export {View};
