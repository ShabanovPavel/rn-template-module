import React from 'react';
import {Provider} from 'react-redux';
import {Screen2Screen, Screen1Screen, MainScreen, PlaygroundScreen, StoryScreen} from './modules';

import {registerComponent, Navigation, setProvider} from './core/navigation';
import {settingsDefault, rootLoadApp} from './routes';
import {AppScreen} from './core/app';
import configureStore from './store';

let isRunApp = false;
const {store} = configureStore();

/** Инициализация модулей */
function initModules() {
	registerComponent('story', StoryScreen);
	registerComponent('playground', PlaygroundScreen);
	registerComponent('screen2', Screen2Screen);
	registerComponent('screen1', Screen1Screen);
	registerComponent('main', MainScreen);
	registerComponent('initApp', AppScreen);
}

/** Инициализация дерева навигаци */
function initRoutes() {
	Navigation.events().registerAppLaunchedListener(() => {
		if (!isRunApp) {
			Navigation.setDefaultOptions(settingsDefault);
			Navigation.setRoot(rootLoadApp);
			isRunApp = true;
		}
	});
}

/** Оборачивает компоненты редаксом */
function ReduxProvider(Component) {
	pstore = store || configureStore();

	return props => (
		<Provider store={pstore}>
			<Component {...props} />
		</Provider>
	);
}

/** Точка входа */
export default function runApp() {
	setProvider(ReduxProvider);
	initModules();
	initRoutes();
}
