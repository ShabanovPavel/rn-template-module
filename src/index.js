import {registerComponent, Navigation} from './core/navigation';
import {OfflineScreen, MainScreen} from './modules';
import {settingsDefault, rootLoadApp} from './routes';
import {AppScreen} from './core';

/** Инициализация модулей */
function initModules() {
	registerComponent('main', MainScreen);
	registerComponent('offline', OfflineScreen);
	registerComponent('initApp', AppScreen);
}

/** Инициализация дерева навигаци */
function initRoutes() {
	Navigation.events().registerAppLaunchedListener(() => {
		Navigation.setDefaultOptions(settingsDefault);
		Navigation.setRoot(rootLoadApp);
	});
}

/** Точка входа */
export default function runApp() {
	initModules();
	initRoutes();
}
