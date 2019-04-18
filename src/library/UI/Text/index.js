import React from 'react';
import {Text as RNText} from 'react-native';
import {I} from '../../I18n';
import {BindSimple} from '../../Component';
import Styles from './styles';

/**
 * Обертка над текстом
 *
 * @class Text
 * @extends {React.PureComponent}
 */
class Text extends React.PureComponent {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;
		const {style, children, i18n} = props;
		return i18n ? (
			<RNText {...this.props} style={{...styles.text, ...style}}>
				{I.text(children)}
			</RNText>
		) : (
			<RNText {...this.props} style={{...styles.text, ...style}} />
		);
	}
}

export {Text};
