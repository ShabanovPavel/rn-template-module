import {Navigation} from 'react-native-navigation';
import {registerComponent} from './core/navigation';
import {AppScreen, OnboardingScreen, PlaygroundScreen} from './modules';
import {settingsDefault, rootLoadApp} from './routes';

/** Инициализация модулей */
function initModules() {
	registerComponent('playground', PlaygroundScreen);
	registerComponent('onboarding', OnboardingScreen);
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
