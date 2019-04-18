import React from 'react';
import {AnalyticService} from '../../analytic-service';
import {traking} from '../../navigation';
import Styles from './styles';
import {Text, View, SplashScreen, BindComponent, Button, Spacer, I} from '../../../library';

let theme = '';
export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		BindComponent(this, {
			styles: Styles,
			statusBar: 'hide',
		});
		traking({analytic: AnalyticService});
	}

	componentDidMount() {
		const {props} = this;
		const {onInit} = props;
		onInit();
		SplashScreen();
	}

	render() {
		const {styles, props} = this;
		const {onOpenOnboarding, onOpenPlayground} = props;
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text i18n>Hello, I am initScreen</Text>
				<Spacer h={5} />
				<Button action={onOpenOnboarding} text='Open Onboarding' />
				<Spacer h={5} />
				<Button action={onOpenPlayground} text='Open Playground' />
				<Spacer h={5} />
				<Button
					action={() => {
						if (theme === '') {
							theme = 'black';
						} else {
							theme = '';
						}
						this.updateTheme(theme);
					}}
					text='Update Theme'
				/>
				<Spacer h={5} />
				<Button
					action={() => {
						I.printNotFound();
					}}
					text='PrintNotFountI18n'
				/>
			</View>
		);
	}
}
