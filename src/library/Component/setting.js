import {pop, bindComponent} from '../../core/navigation';
import {StatusBar, BackHandler} from '../index';

export default (self, options) => {
	bindComponent(self);

	const {isBack, isLightStatus} = options;

	const handleBackPress = () => {
		if (isBack) {
			pop(self.props.componentId);
			return true;
		}
		return true;
	};

	self.componentDidAppear = () => {
		self.__proto__.componentDidAppear && self.__proto__.componentDidAppear();
		// Логика при установки фокуса на экрана
		if (isLightStatus) {
			StatusBar.setLigthTranslucent();
		} else {
			StatusBar.setDarkTranslucent();
		}
	};
	self.componentDidDisappear = () => {
		self.__proto__.componentDidDisappear && self.__proto__.componentDidDisappear();
		// Логика при снятии фокуса с экрана
	};

	self.componentDidMount = () => {
		self.__proto__.componentDidMount && self.__proto__.componentDidMount();
		// Логика при монтировании
		BackHandler.addEventListener('hardwareBackPress', handleBackPress);
		StatusBar.setDarkTranslucent();
	};

	self.componentWillUnmount = () => {
		self.__proto__.componentWillUnmount && self.__proto__.componentWillUnmount();
		// Логика при размонтровании
		BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
	};
};
