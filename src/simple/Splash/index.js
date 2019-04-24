import React from 'react';
import {View, Text, Theme} from '../../library';

export const Splash = () => (
	<View
		style={Theme.createStyles(theme => ({
			flex: 1,
			backgroundColor: 'red',
			alignItems: 'center',
			justifyContent: 'center',
		}))}
	>
		<Text>SplashScreen </Text>
	</View>
);
