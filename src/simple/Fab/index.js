import React from 'react';

import Styles from './styles';
import {View, Text, Theme, BindSimple} from '../../library';

export class Fab extends React.Component {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	setButtons(buttons) {
		console.log(buttons);
	}

	render() {
		return null;
	}
}
