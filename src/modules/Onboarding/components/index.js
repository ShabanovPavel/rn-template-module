import React from 'react';
import Styles from './styles';
import {Text, View, BindComponent, Button, Log} from '../../../library';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		BindComponent(this, {
			styles: Styles,
			isBack: true, // работает ли бек
			statusBar: 'light',
		});
	}

	componentDidMount() {}

	componentWillUnmount() {}

	componentAppear() {}

	componentDisappear() {}

	render() {
		const {styles, props, onBack, propsWix, setPropsWix} = this;
		const {onBack2} = props;
		return (
			<View style={styles.mainContainer}>
				<Button onAction={onBack} text='Hello, I am Onboarding' />
				<Button onAction={onBack2} text='Back 2 Screen' />
				<Button
					onAction={() => {
						setPropsWix({Onboarding: 'visible'}, true);
						Log(propsWix);
					}}
					text='PropsWix'
				/>
			</View>
		);
	}
}
