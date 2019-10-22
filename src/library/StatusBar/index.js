import {Platform} from 'react-native';
import {mergeOptions} from '../../core';

const setStatus = params => {
	const {nameScreen, translucent, hide, colorBackStatusBar} = params || {};
	const trans = translucent === undefined ? true : translucent;

	mergeOptions(nameScreen, {
		statusBar: {
			style: 'light',
			visible: hide,
			drawBehind: false,
			hideWithTopBar: true,
			blur: trans,
			backgroundColor: colorBackStatusBar,
		},
	});
};
const StatusBar = {
	setStatus,
};
export {StatusBar};
