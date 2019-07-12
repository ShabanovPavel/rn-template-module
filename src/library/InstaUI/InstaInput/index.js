import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from '../../UI/TextInput';
import {Icon} from '../../UI/Icon';
import {Button} from '../../UI/Button';
import {View} from '../../UI/View';
import {Theme} from '../../Theme';
import {BindSimple} from '../../Component';
import Styles from './styles';

class InstaInput extends React.Component {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
		this.state = {
			isSecureTextEntry: props.secureTextEntry,
		};
	}

	handleChangeSecure = () => {
		const {isSecureTextEntry} = this.state
		this.setState({isSecureTextEntry: !isSecureTextEntry})
	}

	handleFocus=()=>{if(this.textInput) this.textInput.focus()}

	render() {
		// console.log('InstaInput', this.props);
		const {styles, props, state} = this;
		const {style, styleView, meta = {}, secureTextEntry} = props;
		const {isSecureTextEntry} = state;

		const {error, submitFailed} = meta; // для final-form

		let styleRes = {...styles.inputView, ...styleView, paddingRight: secureTextEntry ? 0 : 22};
		if (error && submitFailed) {
			styleRes = {...styleRes, ...styles.error};
		}

		// console.log('error', error,'submitFailed', submitFailed )

		return (
			<Button style={styleRes} onAction={this.handleFocus} activeOpacity={1}>
				<TextInput
					{...props}
					style={{...styles.input, ...style}}
					placeholderTextColor={styles.textInputColor}
					secureTextEntry={isSecureTextEntry}
					reference={ref => this.textInput = ref}
				/>
				{secureTextEntry && (
					<Button style={styles.secureTextEntryView} onAction={this.handleChangeSecure}>
						<Icon name='EYE' color={styles.iconColor} />
					</Button>
				)}
			</Button>
		);
	}
}

InstaInput.propTypes = {
	style: PropTypes.any,
	styleView: PropTypes.any,
	secureTextEntry: PropTypes.bool,
};

InstaInput.defaultProps = {
	style: undefined,
	styleView: undefined,
	secureTextEntry: false,
};

export {InstaInput};
