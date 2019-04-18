import {Navigation} from 'react-native-navigation';
import {registerComponent} from './core/navigation';
import {OnboardingScreen, PlaygroundScreen} from './modules';
import {AppScreen} from './core/app';
import {OfflineScreen, FabScreen} from './simple';
import {settingsDefault, rootLoadApp} from './routes';

/** Инициализация модулей */
function initModules() {
	// простые компоненты
	registerComponent('fab', FabScreen);
	registerComponent('offline', OfflineScreen);
	// умные компоненты
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
