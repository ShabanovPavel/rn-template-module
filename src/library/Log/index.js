import Options from '../../options';

const Log = (...text) => {
	if (Options.isLog) {
		console.log(...text);
	}
};

export {Log};
