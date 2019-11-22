import {Platform} from 'react-native';
// import RNStatusBar from '@react-native-community/status-bar';
import {mergeOptions} from '../../core/navigation';
/** WIX */
const setStatus = params => {
	const os = Platform.OS;
	const {nameScreen, style, translucent, hide, colorBackStatusBar} = params || {};
	const trans = !translucent
		? {}
		: {[os === 'ios' ? 'blur' : 'drawBehind']: [os === 'ios' ? translucent : !translucent]};
	const styles = !style ? {} : {style};
	const hides = !hide ? {} : {visible: !hide, hideWithTopBar: !hide};
	const hideWithTopBar = !hide ? {} : {hideWithTopBar: hide};
	const colorBackStatusBars = !colorBackStatusBar ? {} : {backgroundColor: colorBackStatusBar};

	if (os === 'ios') {
		mergeOptions(nameScreen, {
			statusBar: {
				...styles,
				...hides,
				...hideWithTopBar,
				...trans,
			},
		});
	} else {
		mergeOptions(nameScreen, {
			statusBar: {
				...styles,
				...hides,
				...trans,
				...colorBackStatusBars,
			},
		});
	}
};

/** JS */
// const setStatus = params => {
// 	const {style, translucent, hide, colorBackStatusBar} = params || {};

// 	!style ? {} : RNStatusBar.setBarStyle(style, true);
// 	!colorBackStatusBar ? {} : RNStatusBar.setBackgroundColor(colorBackStatusBar, true);
// 	!translucent ? {} : RNStatusBar.setTranslucent(translucent);
// 	!hide ? {} : RNStatusBar.setHidden(hide);
// };

const StatusBar = {
	setStatus,
};

export {StatusBar};
