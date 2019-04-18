import {Theme} from '../Theme';

/**
 * Для примитивов
 * @param {Object} self компонент подписи
 * @param {Object} options параметры компонента
 * @param {Function} options.styles функция возвращаюзаяя стиль компонента
 */

export default (self, {styles}) => {
	self.componentDidMount = () => {
		self.__proto__.componentDidMount && self.__proto__.componentDidMount.bind(self)();
		// console.log('componentDidMount');
		// Логика при монтировании
	};

	self.componentWillUnmount = () => {
		self.__proto__.componentWillUnmount && self.__proto__.componentWillUnmount.bind(self)();
		// Логика при размонтровании
	};

	self.componentWillUpdate = () => {
		self.__proto__.componentWillUpdate && self.__proto__.componentWillUpdate.bind(self)();
		self.styles = styles ? Theme.createStyles(styles) : {};
		// console.log('componentWillUpdate');
	};

	self.componentWillMount = () => {
		self.__proto__.componentWillMount && self.__proto__.componentWillMount.bind(self)();
		self.styles = styles ? Theme.createStyles(styles) : {};
		// console.log('componentWillMount');
	};
};
