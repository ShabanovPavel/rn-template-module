import Options from '../../options';

const Log = (...text) => {
	if (Options.isLog && __DEV__ === true) {
		console.log(...text);
	}
};

export {Log};
