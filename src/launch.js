import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#bfd8ff',
	},
	logo: {
		height: 45,
		marginBottom: 25,
	},
});

export default () => (
	<View style={styles.container}>
		<Text>Launch</Text>
	</View>
);
