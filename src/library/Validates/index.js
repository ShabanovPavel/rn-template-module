const required = value => (value ? undefined : 'Required');
const isTrue = value => (value ? undefined : 'notTrue');
const minLength = min => value =>
	value && `${value}`.length >= min ? undefined : `Length should be greater than ${min}`;

const compare = otherValue => value => (otherValue === value ? undefined : 'not compare');
const moreThan = otherValue => value => (Number(value) > otherValue ? undefined : 'not more than');
const fromTo = (min, max) => value => (Number(value) > min && Number(value)<=max ? undefined : 'not more than');

const validateEmail = email => {
	const re = /\S+@\S+\.\S+/;
	if (re.test(email)) {
		return undefined;
	}
	return 'notEmail';
};

// проверка пароля на сложность
const hardPas = pas => {
	const regex = /[^\w\s]/gi;
	// КОСТЫЛЬ:
	// не всегда заходит в первый if при значении true, за то заходит во второй
	if (!!pas && pas.length >= 8 && pas.search(/\d/) !== -1 && regex.test(pas) === true) {
		return undefined;
	}
	if (!!pas && pas.length >= 8 && pas.search(/\d/) !== -1 && regex.test(pas) === true) {
		return undefined;
	}
	return 'need have hard';
};

const Validates = {required, isTrue, minLength, validateEmail, hardPas, compare, moreThan,fromTo};
export {Validates};
