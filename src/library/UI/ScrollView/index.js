import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

/**
 * @module InitflowScrollView
 * @description Обертка над видженом ScrollView
 */
/**
 * @param {Object} contentContainerStyle These styles will be applied to the scroll view content container which wraps all of the child views.
 * @param {Object} style стиль
 * @param {Boolean} keyboardScrolling требуется ли скролинг к полю ввода
 * @param {Boolean} horizontal горизонтальный скрол
 * @param {Boolean} refreshing отображать ли индикатор загрузки
 * @param {Function} onRefresh функция загрузки
 */
class InitflowScrollView extends React.PureComponent {
	render() {
		const {
			style,
			keyboardScrolling,
			contentContainerStyle,
			horizontal,
			refreshing,
			onRefresh,
			reference,
		} = this.props;

		if (!keyboardScrolling) {
			return (
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					{...this.props}
					style={[styles.view, style]}
					contentContainerStyle={[!horizontal && styles.viewContent, contentContainerStyle]}
					refreshControl={
						onRefresh && <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					ref={ref => {
						reference && reference(ref);
						this.scrollView = ref;
					}}
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			);
		}
		return (
			<KeyboardAwareScrollView
				resetScrollToCoords={{x: 0, y: 0}}
				extraScrollHeight={60}
				keyboardOpeningTime={0}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				// keyboardDismissMode='on-drag'
				{...this.props}
				style={[styles.view, style]}
				ref={ref => {
					reference && reference(ref);
					this.scrollView = ref;
				}}
			/>
		);
	}
}

InitflowScrollView.propTypes = {
	...ScrollView.propTypes,
	style: PropTypes.any,
	contentContainerStyle: PropTypes.any,
	keyboardScrolling: PropTypes.bool,
	horizontal: PropTypes.bool,
	refreshing: PropTypes.bool,
	onRefresh: PropTypes.func,
};

InitflowScrollView.defaultProps = {
	style: undefined,
	keyboardScrolling: false,
	contentContainerStyle: undefined,
	horizontal: false,
	refreshing: false,
	onRefresh: undefined,
};

export {InitflowScrollView as ScrollView};
