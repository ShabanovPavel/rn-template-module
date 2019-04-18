import React from 'react';
import {Text} from '../Text';
import {View} from '../View';
import Styles from './styles';
import {BindSimple} from '../../Component';

class Button extends React.Component {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	render() {
		const {styles, props} = this;
		const {text, action, style} = props;
		const stylesView = {
			...styles.simpleView,
			...(style || {}),
		};
		const stylesText = {
			...styles.simpleText,
			...(style || {}),
		};
		return (
			<View onPress={action} style={{stylesView}}>
				<Text i18n onPress={action} style={stylesText}>
					{text}
				</Text>
			</View>
		);
	}
}

export {Button};
