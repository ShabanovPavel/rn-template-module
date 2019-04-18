import color from './color';
import view from './view';
import text from './text';
import simple from './simple';

let type;
let theme = {
	color: color(() => type),
	simple,
	text,
	view,
};

const setTheme = typeTheme => {
	type = typeTheme;
	theme = {
		color: color(() => type),
		simple,
		text,
		view,
	};
};

export const createStyles = creator => creator(theme);

export const Theme = {
	setTheme,
	createStyles,
};
