import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LaunchScreen from './launch'; // to do

import Routes from './routes';
import configureStore from './store';

const { store, persistor } = configureStore();

class AppInitializer extends React.Component {
	async componentWillMount() {
		// await store.dispatch(appReducer.init());
		// await requestCameraPermission();
	}

	render() {
		console.log('AppInitializer', this);
		const { children } = this.props;
		return children;
	}
}

export default () => (
	<Provider store={store}>
		<PersistGate loading={<LaunchScreen />} persistor={persistor}>
			<AppInitializer>
				<Routes />
			</AppInitializer>
		</PersistGate>
	</Provider>
);
