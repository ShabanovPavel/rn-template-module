import React from 'react';
import {AnalyticService} from '../../analytic-service';
import {traking} from '../../navigation';
import Styles from './styles';
import {Text, View, BindComponent, Button, Spacer, I, Icon, Log, Image} from '../../../library';

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
		const {props, setPropsWix} = this;
		const {onInit} = props;
		setPropsWix({appInit: 'one'});
		onInit(this);
	}

	render() {
		const {styles, props, propsWix} = this;
		const {onOpenOnboarding, onOpenPlayground, onOpenIndicators} = props;

		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Image name='WAIT_CONFIRM' style={styles.imageGif} resizeMode='cover' />
				<Icon vector name='star' size={30} color={styles.colorIcon} />
				<Text i18n>Hello, I am initScreen</Text>
				<Spacer h={5} />
				<Button onAction={onOpenOnboarding} text='Open Onboarding' />
				<Spacer h={5} />
				<Button onAction={onOpenPlayground} text='Open Playground' />
				<Spacer h={5} />
				<Button
					onAction={() => {
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
					onAction={() => {
						I.printNotFound();
					}}
					text='PrintNotFountI18n'
				/>
				<Spacer h={5} />
				<Button onAction={onOpenIndicators} text='Indicators' />
				<Spacer h={5} />
				<Button onAction={() => Log(propsWix)} text='PropsWix' />
			</View>
		);
	}
}
