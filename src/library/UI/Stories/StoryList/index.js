import React from 'react';
import PropTypes from 'prop-types';
import {View} from '../../View';
import {BindSimple} from '../../../Component';
import {Utils} from '../../../Utils';
import {FlatList} from '../../FlatList';
import Item from './Item';
import DummyItem from './DummyItem';
import Styles from './styles';

const {objectToArray} = Utils;

/**
 * @module StoryList
 * @description Компонент для горизонтального вывода карточек сторис
 */
/**
 * @param {Number} snapToInterval Для поблочного скролинга
 * @param {Object} scrollStyle Стиль для скрола
 * @param {Object} style Стиль
 * @param {Object} data
 * @param {Function} onOpenStories callback срабатывает при открытии стори
 */
class StoryList extends React.PureComponent {
	constructor(props) {
		super(props);
		BindSimple(this, {styles: Styles});
	}

	renderItem = ({item = {}}) => {
		const {onOpenStories} = this.props;
		const {id, visibility, uri, label} = item;

		if (uri) {
			return (
				<Item
					id={id}
					uri={uri}
					visibility={visibility}
					label={label}
					onOpenStories={onOpenStories}
				/>
			);
		}
		return <DummyItem />;
	};

	render() {
		const {styles} = this;
		const {data, scrollStyle, style, snapToInterval} = this.props;

		return (
			<View style={style}>
				{objectToArray(data).length > 0 ? (
					<FlatList
						data={objectToArray(data)}
						keyExtractor={item => `${item.id}`}
						renderItem={this.renderItem}
						horizontal
						decelerationRate="fast"
						snapToInterval={snapToInterval}
						style={[styles.contentView, scrollStyle]}
						contentContainerStyle={styles.contentList}
					/>
				) : (
					<View style={[styles.contentView, scrollStyle]} />
				)}
			</View>
		);
	}
}

StoryList.propTypes = {
	data: PropTypes.object,
	scrollStyle: PropTypes.any,
	style: PropTypes.any,
	snapToInterval: PropTypes.number,
	onOpenStories: PropTypes.func,
};

StoryList.defaultProps = {
	data: {},
	scrollStyle: {},
	style: {},
	snapToInterval: undefined,
	onOpenStories: () => {},
};

export {StoryList};
