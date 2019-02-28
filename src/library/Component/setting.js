import {pop, bindComponent} from '../../core/navigation';
import {StatusBar, BackHandler} from '../index';

export default (self, options) => {
	bindComponent(self);
	StatusBar.setDarkTranslucent();

	const {isBack, isLightStatus} = options;

	const handleBackPress = () => {
		if (isBack) {
			pop(self.props.componentId);
			return true;
		}
		return true;
	};

	self.onFocus = () => {
		if (isLightStatus) {
			StatusBar.setLigthTranslucent();
		} else {
			StatusBar.setDarkTranslucent();
		}
	};

	self.onClearBindComponent = () => {
		BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
	};
	BackHandler.addEventListener('hardwareBackPress', handleBackPress);
};
