import color from './color';
import view from './view';
import text from './text';
import simple from './simple';
import macro from './macro';

let type;
let callBackUpdateTheme;
let theme = {
	color: color(() => type),
	simple,
	text,
	view,
	macro,
};

const setTheme = typeTheme => {
	type = typeTheme;
	theme = {
		color: color(() => type),
		simple,
		text,
		view,
		macro,
	};
	callBackUpdateTheme && callBackUpdateTheme(theme);
};

/** Вешает слушателя на обновление темы
 * @param {Function} call слушатель на обновление темы
 */
const onUpdateTheme = call => {
	callBackUpdateTheme = call;
};

const createStyles = (creator, params) => creator(theme, params);

const getColors = () => theme.color;

export const Theme = {
	onUpdateTheme,
	theme,
	setTheme,
	createStyles,
	getColors,
};
