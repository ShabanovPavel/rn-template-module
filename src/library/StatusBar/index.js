import {Platform} from 'react-native';
import {mergeOptions} from '../../core/navigation';

const setStatus = params => {
	const os = Platform.OS;
	const {nameScreen, style, translucent, hide, colorBackStatusBar} = params || {};
	const trans = !translucent ? {} : {[os === 'ios' ? 'blur' : 'drawBehind']: translucent};
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
const StatusBar = {
	setStatus,
};

export {StatusBar};
