import {Platform} from 'react-native';
import SplashScreenMod from 'react-native-smart-splash-screen';

const SplashScreen = () =>
	Platform.select({
		ios: () => {
			SplashScreenMod.close({
				animationType: SplashScreenMod.animationType.fade,
				duration: 850,
				delay: 500,
			});
		},
		android: () =>
			SplashScreenMod.close({
				animationType: SplashScreenMod.animationType.fade,
				duration: 850,
				delay: 500,
			}),
	})();

export {SplashScreen};
