import {registerComponent, showOverlay, Navigation} from './core/navigation';
import {OnboardingScreen, PlaygroundScreen} from './modules';
import {AppScreen} from './core/app';
import {Offline, Fab, Splash} from './simple';
import {settingsDefault, rootLoadApp} from './routes';

/** Инициализация модулей */
function initModules() {
	// простые компоненты
	registerComponent('splash', Splash); // Заставка
	registerComponent('fab', Fab); // фаб меню
	registerComponent('offline', Offline); // планка оффлайн режима
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
