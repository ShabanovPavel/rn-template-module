import React from 'react';
import {TouchableOpacity, Keyboard} from 'react-native';
import {Simple} from './simple';
import {Full} from './full';
import {Around} from './around';
import {FullG} from './fullG';
import Gradient from './grad';

/**
 * @module Button
 * @description Кнопка
 */
/**
 * @param {Function} onAction функция срабатываемая при нажатии
 * @param {String} text текст в нутри кнопки
 * @param {String} type тип кнопки
 * @param {String} color цвет кнопки в активном состоянии
 * @param {String} disabledColor цвет кнопки в неактивном состоянии
 * @param {String} icon название иконки отображаемой в кнопке
 * @param {Object} iconStyle стиль для иконки
 * @param {Object} style стили
 * @param {Boolean} isLoadBar нужен ли индикатор загрузки
 * @param {Boolean} enable активна кнопка или нет
 * @param {Number} activeOpacity прозрачность кнопки
 * @param {Boolean} keyDismiss нужно ли скрывать клаву при нажатии
 */
class Button extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	handleOnAction = () => {
		const {onAction, keyDismiss} = this.props;

		if (keyDismiss) {
			requestAnimationFrame(Keyboard.dismiss);
		}
		onAction();
	};

	render() {
		const {props} = this;

		const {fullG, simple, full, around, grad, onAction, activeOpacity, ...other} = props;

		if (fullG) {
			return <FullG {...other} onAction={this.handleOnAction} activeOpacity={activeOpacity} />;
		}
		if (simple) {
			return <Simple {...other} onAction={this.handleOnAction} activeOpacity={activeOpacity} />;
		}
		if (full) {
			return <Full {...other} onAction={this.handleOnAction} activeOpacity={activeOpacity} />;
		}
		if (around) {
			return <Around {...other} onAction={this.handleOnAction} activeOpacity={activeOpacity} />;
		}
		if (grad) {
			return <Gradient {...other} onAction={this.handleOnAction} activeOpacity={0} />;
		}

		return <TouchableOpacity activeOpacity={activeOpacity} {...other} onPress={onAction} />;
	}
}

export {Button};
