import {StatusBar, Platform} from 'react-native';

function InitflowStatusBar() {}

InitflowStatusBar.setStyle = ({backgroundColor, barStyle, animated, hidden, translucent}) => {
	Platform.select({
		ios: () => {
			barStyle !== undefined ? StatusBar.setBarStyle(barStyle, animated) : undefined;
			hidden !== undefined ? StatusBar.setHidden(hidden, animated) : undefined;
		},
		android: () => {
			backgroundColor !== undefined
				? StatusBar.setBackgroundColor(backgroundColor, animated)
				: undefined;
			barStyle !== undefined ? StatusBar.setBarStyle(barStyle, animated) : undefined;
			translucent !== undefined ? StatusBar.setTranslucent(translucent) : undefined;
			hidden !== undefined ? StatusBar.setHidden(hidden, animated) : undefined;
		},
	})();
};

InitflowStatusBar.setDarkTranslucent = () => {
	InitflowStatusBar.setStyle({
		backgroundColor: 'rgba(255,255,255,0)',
		barStyle: 'dark-content',
		translucent: true,
		hidden: false,
		animated: false,
	});
};

InitflowStatusBar.setLigthTranslucent = () => {
	InitflowStatusBar.setStyle({
		backgroundColor: 'rgba(255,255,255,0)',
		barStyle: 'light-content',
		translucent: true,
		hidden: false,
		animated: false,
	});
};

InitflowStatusBar.hide = () => {
	InitflowStatusBar.setStyle({
		backgroundColor: 'rgba(255,255,255,0)',
		barStyle: 'light-content',
		translucent: true,
		hidden: true,
		animated: false,
	});
};

export {InitflowStatusBar as StatusBar};
