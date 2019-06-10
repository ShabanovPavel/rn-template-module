import React from 'react';
import Styles from './styles';
import {
	View,
	BindComponent,
	Button,
	Log,
	MaterialIndicator,
	DotIndicator,
	BallIndicator,
	PulseIndicator,
	BarIndicator,
	PacmanIndicator,
	ActivityIndicator,
	SkypeIndicator,
} from '../../../library';

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
		const {styles, props, onBack, state} = this;
		const {isLoadScreen} = state;

		return (
			<View safeArea style={styles.mainContainer}>
				<Button action={onBack} text='Hello, I am Indicators' />
				{isLoadScreen ? (
					<>
						<MaterialIndicator color={styles.indicatorColor} />
						<DotIndicator color={styles.indicatorColor} count={3} animationDuration={800} />
						<BallIndicator color={styles.indicatorColor} animationDuration={800} />
						<PulseIndicator color={styles.indicatorColor} />
						<BarIndicator color={styles.indicatorColor} count={5} />
						<PacmanIndicator color={styles.indicatorColor} />
						<ActivityIndicator color={styles.indicatorColor} />
						<SkypeIndicator color={styles.indicatorColor} />
					</>
				) : (
					<PacmanIndicator color={styles.indicatorColor} />
				)}
			</View>
		);
	}
}
