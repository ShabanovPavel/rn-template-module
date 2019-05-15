import {Platform} from 'react-native';
import SplashScreenMod from 'react-native-splash-screen';

const SplashScreen = () =>
	Platform.select({
		ios: () => {
			SplashScreenMod.hide();
		},
		android: () => {
			SplashScreenMod.hide();
		},
	})();

export {SplashScreen};
