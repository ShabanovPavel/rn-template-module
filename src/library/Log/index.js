import Config from '../../config';

const Log = (...params) => {
	if (Config.boolean.isLog) {
		console.log(...params);
	}
};

export {Log};
