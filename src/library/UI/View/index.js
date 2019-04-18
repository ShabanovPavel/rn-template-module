import React from 'react';
import {View as RNView} from 'react-native';
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
		const {style} = props;

		return <RNView {...this.props} style={{...styles.view, ...style}} />;
	}
}

export {View};
