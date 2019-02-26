import React from 'react';
import {Text as RNText} from 'react-native';
import {I} from '../../I18n';
import styles from './styles';

/**
 * Обертка над текстом
 *
 * @class Text
 * @extends {React.PureComponent}
 */
class Text extends React.PureComponent {
	render() {
		const {style, children, i18n} = this.props;
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
