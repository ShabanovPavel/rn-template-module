import {registerComponent, Navigation} from './core/navigation';
import {OnboardingScreen, PlaygroundScreen, IndicatorsScreen} from './modules';
import {AppScreen} from './core/app';
import {Offline, Fab} from './simple';
import {settingsDefault, rootLoadApp} from './routes';

/** Инициализация модулей */
function initModules() {
	// простые компоненты
	registerComponent('fab', Fab); // фаб меню
	registerComponent('offline', Offline); // планка оффлайн режима
	// умные компоненты
	registerComponent('indicators', IndicatorsScreen);
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
