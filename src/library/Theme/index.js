import {ColorDefault, ColorBlack} from './color';

function Theme() {}

Theme.color = {
	BLUE: '#1B2ECC',
	BLACK: 'rgb(51, 51, 51)',
	WHITE: 'rgb(255,255,255)',
	GRAY_TEXT_BAR: '#808080',
	GRAY_ELEMENT_BAR: '#cccccccc',
};

Theme.setDefault = () => {
	Theme.color = {...Theme.color, ...ColorDefault};
};

Theme.setBalck = () => {
	Theme.color = {...Theme.color, ...ColorBlack};
};

export {Theme};
