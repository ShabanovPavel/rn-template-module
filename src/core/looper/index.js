import Looper from './cor';

const startLooper = (name, action, interval = 1) => {
	const ref = Looper.instance();
	if (!ref.buff[name])
		ref.buff[name] = {
			action,
			interval,
			wait: interval,
		};
};

const stopLooper = name => {
	const ref = Looper.instance();
	delete ref.buff[name];
};

export {startLooper, stopLooper};
