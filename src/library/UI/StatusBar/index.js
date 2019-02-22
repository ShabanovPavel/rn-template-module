import {StatusBar, Platform} from 'react-native';

function InitflowStatusBar() {}

InitflowStatusBar.setStyle = ({backgroundColor, barStyle, animated, higgen, translucent}) => {
	Platform.select({
		ios: () => {
			barStyle ? StatusBar.setBarStyle(barStyle, animated) : undefined;
			higgen ? StatusBar.setHidden(higgen, animated) : undefined;
		},
		android: () => {
			backgroundColor ? StatusBar.setBackgroundColor(backgroundColor, animated) : undefined;
			barStyle ? StatusBar.setBarStyle(barStyle, animated) : undefined;
			translucent ? StatusBar.setTranslucent(translucent) : undefined;
			higgen ? StatusBar.setHidden(higgen, animated) : undefined;
		},
	})();
};

InitflowStatusBar.setDarkTranslucent = () => {
	InitflowStatusBar.setStyle({
		backgroundColor: 'rgba(255,255,255,0)',
		barStyle: 'dark-content',
		translucent: true,
		higgen: false,
		animated: true,
	});
};

InitflowStatusBar.setLigthTranslucent = () => {
	InitflowStatusBar.setStyle({
		backgroundColor: 'rgba(255,255,255,0)',
		barStyle: 'light-content',
		translucent: true,
		higgen: false,
		animated: true,
	});
};

export {InitflowStatusBar as StatusBar};
