import React from 'react';
import {AnalyticService} from '../../analytic-service';
import {traking} from '../../navigation';
import Styles from './styles';
import {Text, View, BindComponent, Button, Spacer, I, Icon} from '../../../library';

let theme = '';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);
		// ...
		BindComponent(this, {
			styles: Styles,
			statusBar: 'hide',
		});
		traking(props.componentId, {analytic: AnalyticService});
	}

	componentDidMount() {
		const {props} = this;
		const {onInit} = props;
		onInit(this);
	}

	render() {
		const {styles, props} = this;
		const {onOpenOnboarding, onOpenPlayground, onOpenIndicators} = props;
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Icon vector name='star' size={30} color={styles.colorIcon} />
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
				<Button action={onOpenIndicators} text='Indicators' />
			</View>
		);
	}
}
