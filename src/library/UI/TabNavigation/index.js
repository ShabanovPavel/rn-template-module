import React from 'react';

import {createBottomTabNavigator,createMaterialTopTabNavigator,createAppContainer} from 'react-navigation';
import {BindSimple} from '../../Component'
import {ActivityIndicator} from '../ActivityIndicators'
import Styles from './styles';


let TopTabNavigationInstrument;
let listScreenKey = [];


export default class Tab extends React.PureComponent {
	constructor(props) {
        super(props);
        
        const {firstScreen} = props;
		this.state = {
			isShowModal: false,
			screenKey: firstScreen||'',
		};
		BindSimple(this,{
            styles:Styles
        })
		this.tabNavigatorBuilder();
	}

	componentDidUpdate() {
		this.tabNavigatorBuilder();
	}

	tabNavigatorBuilder = () => {
        const {props,state} =this;
        const {screenKey} = state;
        const {screens,options} =props

        for( el in screens){
            listScreen[el.name]= {screen: el};
        }

		if (JSON.stringify(Object.keys(listScreen || {}).sort()) !== JSON.stringify(listScreenKey)) {
			listScreenKey = Object.keys(listScreen || {}).sort();

			TopTabNavigationInstrument = createMaterialTopTabNavigator(listScreen, options);

			this.forceUpdate();
		}
	};

	onNavigationStateChange = (prevState, {index, routes}) => {
		const {key} = routes[index];
		this.setState({screenKey: key});
	};

	


	render() {
		const {
            styles
		} = this;


		return (
			<View style={{flex: 1, backgroundColor: Color.WHITE}}>
					<View style={{flex: 1}}>
						{TopTabNavigationInstrument ? (
							<TopTabNavigationInstrument
								screenProps={{
									...this.props,
									callbackRef: self => {
										navigationInstrument = self;
									},
								}}
								onNavigationStateChange={this.onNavigationStateChange}
							/>
						) : (
							<ActivityIndicator isAllSpace size='large' />
						)}
					</View>
			</View>
		);
	}
}

export {Tab as TabNavigation};
