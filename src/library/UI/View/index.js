import React from 'react';
import {View as RNView} from 'react-native';
import styles from './styles';

/**
 *  Обетка над видженом
 *
 * @class View
 * @extends {React.PureComponent}
 */
class View extends React.PureComponent {
	render() {
		const {style} = this.props;
		// console.log(styles);
		return <RNView {...this.props} style={{...styles.view, ...style}} />;
	}
}

export {View};
