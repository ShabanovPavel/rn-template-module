import React from 'react';
import {View, Text, Theme} from '../../library';

export const Offline = () => (
	<View
		style={Theme.createStyles(theme => ({
			paddingTop: 50,
			backgroundColor: 'red',
			alignItems: 'center',
			justifyContent: 'center',
		}))}
	>
		<Text>Offline </Text>
	</View>
);